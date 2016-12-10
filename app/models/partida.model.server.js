var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidaSchema = new Schema({
    idJogador1: {type: mongoose.Schema.Types.ObjectId, ref: 'Jogador'},
    idJogador2: {type: mongoose.Schema.Types.ObjectId, ref: 'Jogador'},
    data: Date,
    finalizada: Boolean,
    idVencedor: String,
});

mongoose.model('Partida', PartidaSchema);
