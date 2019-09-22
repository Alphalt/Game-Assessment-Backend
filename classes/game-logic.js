const { Results } = require('../properties/results');
const { PlayersIdentifiers } = require('../properties/players-identifier');

function getRoundWinner(optionOne, optionTwo) {
    let result = null;
    ((3 + optionTwo - optionOne) % 3) ? 1 === ((3 + optionTwo - optionOne) % 3) ? result=Results.LOSSES : result=Results.WINS : result=Results.TIES;
    return result;
}

function getWinnerIdentifier(winner) {
    let winnerIdentifier = null;
    if(winner === Results.LOSSES) winnerIdentifier = PlayersIdentifiers.PLAYERTWO;
    if(winner === Results.WINS) winnerIdentifier = PlayersIdentifiers.PLAYERONE;
    if(winner === Results.TIES) winnerIdentifier = PlayersIdentifiers.TIE;

    return winnerIdentifier;
}

function getCountOfPoints(winnersIdentifiers) {
    return winnersIdentifiers.reduce((count, winner) => {
        count[winner] = (count[winner] || 0) + 1;
        return count;
    }, {});
}

function getGameWinner(countWinners) {
    if(countWinners['0'] === countWinners['1'] && countWinners['0'] === countWinners['2']) return PlayersIdentifiers.TIE;
    if(countWinners['0'] > countWinners['1'] && countWinners['0'] > countWinners['2']) return PlayersIdentifiers.TIE;
    if(countWinners['1'] > countWinners['0'] && countWinners['1'] > countWinners['2']) return PlayersIdentifiers.PLAYERONE;
    if(countWinners['2'] > countWinners['0'] && countWinners['2'] > countWinners['1']) return PlayersIdentifiers.PLAYERTWO;
}

exports.getRoundWinner = getRoundWinner;
exports.getWinnerIdentifier = getWinnerIdentifier;
exports.getCountOfPoints = getCountOfPoints;
exports.getGameWinner = getGameWinner;