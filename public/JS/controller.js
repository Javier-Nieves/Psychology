exports.index = async (req, res) => {
  res.status(200).render("index", { title: "no title" });
};
