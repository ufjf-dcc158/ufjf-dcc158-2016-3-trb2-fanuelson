var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);
  require('../app/models/jogador.model.server.js');
  require('../app/models/partida.model.server.js');
  return db;
}
