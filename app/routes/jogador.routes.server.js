module.exports = function(app){
  var jogador = require("../controllers/jogador.controllers.server.js");
  app.route("/jogador")
    .post(jogador.create)
    .get(jogador.list);
  app.route("/jogador/:jogadorId")
   .get(jogador.read)
  app.param("jogadorId", jogador.getById);
}
