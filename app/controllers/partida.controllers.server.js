var Partida = require('mongoose').model('Partida');
var Jogador = require('mongoose').model('Jogador');
var EloRating = require('elo-rating');

module.exports.create = function(req, res, next){
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
        partida.idVencedor = req.body.idVencedor;
        Partida.findByIdAndUpdate(partida._id, { $set: partida}, { new: true }, function (err, part2) {
            if (err) next(err);
            var idVencedor = part2.idVencedor;
            var idPerdedor = part2.idVencedor == part2.idJogador1 ? part2.idJogador2 : part2.idJogador1;
            Jogador.findById(idVencedor, function (err, jogadorVencedor) {
                Jogador.findById(idPerdedor, function (err, jogadorPerdedor) {
                    jogadorVencedor.qtdVitorias++;
                    jogadorPerdedor.qtdDerrotas++;

                    var resultElo = EloRating.calculate(jogadorVencedor.elo, jogadorPerdedor.elo, true);
                    jogadorVencedor.elo = resultElo.playerRating;
                    jogadorPerdedor.elo = resultElo.opponentRating;

                    Jogador.findByIdAndUpdate(jogadorVencedor._id, { $set: jogadorVencedor}, { new: true }, function (err, jv) {
                        if (err) next(err);
                        Jogador.findByIdAndUpdate(jogadorPerdedor._id, { $set: jogadorPerdedor}, { new: true }, function (err, jp) {
                            if (err) next(err);
                            res.send(part2);
                        });
                    });

                });
            });

        });
    });

}


module.exports.list = function(req, res, next){
    Partida.find({}, function(err, partidas) {
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