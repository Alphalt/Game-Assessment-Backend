const { Game } = require('../models/game');
const { Round, validateRound } = require('../models/round');
const { getRoundWinner, getWinnerIdentifier } = require('../classes/game-logic');
const express = require('express');
const router = express.Router();

router.post('/move', async (req, res) => {
    const { error } = validateRound(req.body.round);
    if (error) return res.status(400).send(error.details[0].message);

    const game = await Game.findById(req.body.gameId);
    if (!game) return res.status(400).send('Invalid game.');
    if (!game.isPlaying) return res.status(400).send('The game is not active.');
    if (game.rounds.length === game.numberOfRounds) return res.status(400).send('The game is over.');

    const winner = getRoundWinner(req.body.round.optionPlayerOne, req.body.round.optionPlayerTwo);
    const winnerIdentifier = getWinnerIdentifier(winner);

    const round = new Round({
        optionPlayerOne: req.body.round.optionPlayerOne,
        optionPlayerTwo: req.body.round.optionPlayerTwo,
        winner: winnerIdentifier
    });
    await round.save();

    const totalRounds = game.rounds;
    const currentTotalRounds = [...totalRounds, round];

    game.rounds = currentTotalRounds;
    await game.save();

    res.status(200).send(round);
});

module.exports = router;