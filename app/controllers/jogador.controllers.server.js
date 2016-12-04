var Jogador = require('mongoose').model('Jogador');

module.exports.create = function(req, res,
 next){
   var jogador = new Jogador(req.body);
   jogador.save(function (err) {
     if(err){
       next(err);
     }else{
       res.json(jogador);
     }
   });
}


module.exports.list = function(req, res, next){
  Jogador.find({}, function(err, jogadores) {
    if(err){
      next(err);
    } else {
      res.json(jogadores);
    }
  });
}

module.exports.getById = function(req, res, next, id){
  Jogador.findOne({"_id":id}, function(err, jogador){
    if(err){
      res.json({});
    }else{
      req.jogador = jogador;
      next();
    }
  });
}

module.exports.read = function(req, res, next){
  res.json(req.jogador);
}
