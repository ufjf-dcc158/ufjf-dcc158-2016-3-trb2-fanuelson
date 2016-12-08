var EloRating = require('elo-rating');

var play1 = 1750;
var play2 = 1000;

var result = EloRating.calculate(play1, play2, false);

console.log(result);

console.log("play1 diff:", result.playerRating - play1);
console.log("play2 diff:", result.opponentRating - play2);


switch (2) {
    case 1:
        console.log(1);
    case 2:
        console.log(2);
    default:
        console.log(null);
}
