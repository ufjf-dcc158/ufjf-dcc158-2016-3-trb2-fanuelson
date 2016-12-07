var Partida = require('mongoose').model('Partida');

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