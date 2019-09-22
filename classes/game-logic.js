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

exports.getRoundWinner = getRoundWinner;
exports.getWinnerIdentifier = getWinnerIdentifier;