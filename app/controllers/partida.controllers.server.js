var Partida = require('mongoose').model('Partida');
var Jogador = require('mongoose').model('Jogador');
var EloRating = require('elo-rating');

var validate = function(campo, obj, res) {
   var invalidObj = {
      requiredMessage: "Campo "+campo+" obrigatório."
   }
   if(!obj) {
      res.status(400).send(invalidObj);
      return false;
   }
   return true;
}

module.exports.create = function(req, res, next){
    req.body.finalizada = false;
    if(!validate("jogador1", req.body.idJogador1, res)
      || !validate("jogador2", req.body.idJogador2, res)
      || !validate("data", req.body.data, res) ) {
      return
   }
    var part = new Partida(req.body);
    part.save(function (err) {
        if(err){
            next(err);
        }else{
            res.json(part);
        }
    });
}

module.exports.registrarVencedor = function (req, res, next) {

    Partida.findById(req.body.idPartida, function (err, partida) {
        if (err) next(err);

        if(partida.finalizada) {
            res.status(400).send({"mensagem":"Partida já finalizada."});
            return;
        }
        switch (parseInt(req.body.numeroVencedor)) {
            case 1:
                partida.idVencedor = partida.idJogador1;
                break;
            case 2:
                partida.idVencedor = partida.idJogador2;
                break;
            default:
                partida.idVencedor = null;
        }
        partida.finalizada = true;
        Partida.findByIdAndUpdate(partida._id, { $set: partida}, { new: true }, function (err, part2) {
            if (err) next(err);
            if(part2.idVencedor) {
                var idVencedor = part2.idVencedor;
                var idPerdedor = part2.idVencedor == part2.idJogador1 ? part2.idJogador2 : part2.idJogador1;
            }else{
                var idVencedor = part2.idJogador1;
                var idPerdedor = part2.idJogador2;
            }
            Jogador.findById(idVencedor, function (err, jogadorVencedor) {
                Jogador.findById(idPerdedor, function (err, jogadorPerdedor) {
                    if(part2.idVencedor) {
                        jogadorVencedor.qtdVitorias++;
                        jogadorPerdedor.qtdDerrotas++;

                        var resultElo = EloRating.calculate(jogadorVencedor.elo, jogadorPerdedor.elo, true, 25);
                        jogadorVencedor.elo = resultElo.playerRating;
                        jogadorPerdedor.elo = resultElo.opponentRating;
                    }else{
                        jogadorVencedor.qtdEmpates++;
                        jogadorPerdedor.qtdEmpates++;
                    }
                    Jogador.findByIdAndUpdate(jogadorVencedor._id, { $set: jogadorVencedor}, { new: true }, function (err, jv) {
                        if (err) next(err);
                        Jogador.findByIdAndUpdate(jogadorPerdedor._id, { $set: jogadorPerdedor}, { new: true }, function (err, jp) {
                            if (err) next(err);
                            res.send({
                                "obj": part2,
                                "mensagem": "Resultado Registrado com sucesso!"
                            });
                        });
                    });
                });
            });
        });
    });

}

module.exports.list = function(req, res, next){
   Partida.find({})
   .populate('idJogador1')
   .exec(function(err, partidas) {
        if(err){
            next(err);
        } else {
            res.json(partidas);
        }
    });
}

module.exports.findByJogador = function(req, res, next, idJogador){
    Partida.find({$or:[ {"idJogador1": idJogador}, {'idJogador2': idJogador}]}, function(err, partidas){
        if(err){
            next(err);
        }else{
            res.json(partidas);
        }
    });
}

module.exports.findById = function(req, res, next, idPart){
    Partida.find({_id: idPart})
    .populate(['idJogador2', 'idJogador1' ])
    .exec(function(err, p){
        if(err){
            next(err);
        }else{
            res.json(p);
        }
    });
}
