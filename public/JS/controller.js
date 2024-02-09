const Email = require("./email");

exports.index = async (req, res) => {
  res.status(200).render("index", { title: "no title" });
};

exports.message = async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  // send Welcome email
  await new Email(newUser).sendWelcome();
  // send Question email
  await new Email(newUser).sendQuestion();

  res.status(200).json({ status: "success" });
};
