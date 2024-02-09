const Email = require("./email");

exports.index = async (req, res) => {
  res.status(200).render("index", { title: "no title" });
};

exports.message = async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };
  // send Welcome email
  await new Email(newUser).sendWelcome();

  res.status(200).json({ status: "success" });
};
