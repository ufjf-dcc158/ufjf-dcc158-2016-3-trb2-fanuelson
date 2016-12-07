module.exports = function(app){
    var partida = require("../controllers/partida.controllers.server");
    app.route("/partida")
        .post(partida.create)
        .get(partida.list);
    app.route("/partida/:idJogador")
        .get(partida.findByJogador)
    app.param("idJogador", partida.findByJogador);
}
