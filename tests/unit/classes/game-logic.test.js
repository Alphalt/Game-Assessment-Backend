const { getRoundWinner, getWinnerIdentifier, getCountOfPoints, getGameWinner } = require('../../../classes/game-logic');
const { Results } = require('../../../properties/results');
const { PlayersIdentifiers } = require('../../../properties/players-identifier');

describe('Game Logic', () => {

    it('getRoundWinner should set LOSSES when Player One loses', () => {
        const paramOptionOne = 1;
        const paramOptionTwo = 2;

        const result = getRoundWinner(paramOptionOne, paramOptionTwo);

        expect(result).toBe(Results.LOSSES);
    });

    it('getRoundWinner should set WINS when Player One wins', () => {
        const paramOptionOne = 0;
        const paramOptionTwo = 2;

        const result = getRoundWinner(paramOptionOne, paramOptionTwo);

        expect(result).toBe(Results.WINS);
    });

    it('getRoundWinner should set TIES when the game is tied', () => {
        const paramOptionOne = 1;
        const paramOptionTwo = 1;

        const result = getRoundWinner(paramOptionOne, paramOptionTwo);

        expect(result).toBe(Results.TIES);
    });

    it('getWinnerIdentifier should return Player One identifier when he wins', () => {
        const params = 1;

        const result = getWinnerIdentifier(params);

        expect(result).toBe(PlayersIdentifiers.PLAYERONE);
    });

    it('getWinnerIdentifier should return Player Two identifier when he wins', () => {
        const params = 0;

        const result = getWinnerIdentifier(params);

        expect(result).toBe(PlayersIdentifiers.PLAYERTWO);
    });

    it('getCountOfPoints should return count of points per player', () => {
        const params = ['1', '2', '1'];

        const result = getCountOfPoints(params);

        expect(result).toStrictEqual({"1": 2, "2": 1});
    });

    it('getGameWinner should return the identifier of the winner', () => {
        const params = {"1": 2, "2": 1};

        const result = getGameWinner(params);

        expect(result).toStrictEqual('1');
    });


});