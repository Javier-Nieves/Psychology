const Email = require("./email");

exports.index = async (req, res) => {
  const newUser = {
    name: "Boris Britva",
    email: "animal@gmailc.com",
  };
  // send Welcome email
  const url = `get.lost`;
  console.log("sending email");
  await new Email(newUser, url).sendWelcome();
  console.log("sent");
  res.status(200).render("index", { title: "no title" });
};
