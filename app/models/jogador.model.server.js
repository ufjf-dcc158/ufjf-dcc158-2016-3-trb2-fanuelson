var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JogadorSchema = new Schema({
  nome: String,
  qtdVitorias: Number,
  qtdDerrotas: Number,
  qtdEmpates: Number,
  elo: Number
});

mongoose.model('Jogador', JogadorSchema);
