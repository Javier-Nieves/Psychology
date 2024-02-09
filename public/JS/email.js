const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");
const pug = require("pug");
const path = require("path");

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.trim().split(" ")[0];
    this.fullName = user.name.trim();
    this.message = user.message;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "Gmail",
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASS,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // render HTML based on the pug template
    const html = pug.renderFile(
      path.join(__dirname, "..", "..", `/views/emails/${template}.pug`),
      {
        firstName: this.firstName,
        fullName: this.fullName,
        message: this.message,
        email: this.to,
        subject,
      }
    );
    // email options (questions are sent to self)
    const mailOptions = {
      from: this.from,
      to: template === "question" ? this.from : this.to,
      subject,
      html,
      // all html text stripped of it's form (for spam filters and other cases):
      text: convert(html),
    };
    //create transport, send email
    try {
      await this.newTransport().sendMail(mailOptions);
      //   console.log("message sent to: ", mailOptions.to);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  }

  async sendWelcome() {
    // 'welcome' - is a pug email template
    await this.send("welcome", "Welcome to the site");
  }

  async sendQuestion() {
    await this.send("question", "Question from the web page");
  }
};
