module.exports = function(app){
  var jogador = require("../controllers/jogador.controllers.server.js");
  app.route("/jogador")
    .post(jogador.create)
    .put(jogador.update)
    .get(jogador.list);

    app.route("/jogador/top100")
      .get(jogador.findTop100OrderByElo);

  app.route("/jogador/:jogadorId")
   .get(jogador.read)
  app.param("jogadorId", jogador.getById);

}
