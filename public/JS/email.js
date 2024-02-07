const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");
const pug = require("pug");
const path = require("path");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // sendgrid?
      return 1;
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
    console.log("rendering");
    const html = pug.renderFile(
      path.join(__dirname, "..", "..", `/views/emails/${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    console.log("DONE #1");
    // email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // all html text stripped of it's form (for spam filters and other cases):
      text: convert(html),
    };
    //create transport, send email
    console.log("sending #2");
    // const textTrans = await this.newTransport();
    console.log("transport ok! _____________________>>>");
    try {
      const info = await this.newTransport().sendMail(mailOptions);
      console.log("OK!", info);
    } catch (err) {
      console.error("Error sending email:", err);
    }

    // await this.newTransport().sendMail({
    //   from: "xxx@gmail.com",
    //   to: "xxx@gmail.com",
    //   subject: "hello world!",
    //   text: "hello world!",
    // });
    console.log("done #2!!!!");
  }

  async sendWelcome() {
    // 'welcome' - is a pug email template
    console.log("welcoming");
    await this.send("welcome", "Welcome to the site");
    console.log("done");
  }
};
