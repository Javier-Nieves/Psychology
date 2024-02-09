const Email = require("./email");

exports.index = async (req, res) => {
  // const newUser = {
  //   name: "Boris Britva",
  //   email: "animal@gmailc.com",
  // };
  // // send Welcome email
  // const url = `get.lost`;
  // await new Email(newUser, url).sendWelcome();

  res.status(200).render("index", { title: "no title" });
};

exports.message = async (req, res) => {
  console.log("message: ", req.body);
};
