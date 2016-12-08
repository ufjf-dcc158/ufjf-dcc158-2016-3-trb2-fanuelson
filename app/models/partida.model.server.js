var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidaSchema = new Schema({
    idJogador1: String,
    idJogador2: String,
    data: Date,
    finalizada: Boolean,
    idVencedor: String
});

mongoose.model('Partida', PartidaSchema);
