module.exports.home = function (req, res, next) {
  res.render("index",{
    titulo: "Rest App Running!"
  });
}
