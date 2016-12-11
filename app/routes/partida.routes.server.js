module.exports = function(app){
    var partida = require("../controllers/partida.controllers.server");
    app.route("/partida")
        .post(partida.create)
        .get(partida.list);

    app.route("/partida/registrar/resultado")
        .post(partida.registrarVencedor);

     app.route("/partida/:idPart")
        .get(partida.findById)
        app.param("idPart", partida.findById);

    app.route("/partida/:idJogador/partidas")
        .get(partida.findByJogador)
    app.param("idJogador", partida.findByJogador);

}
