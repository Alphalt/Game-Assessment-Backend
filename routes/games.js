const { Game, validateGame } = require('../models/game');
const { Player, validatePlayer } = require('../models/player');
const { getCountOfPoints, getGameWinner } = require('../classes/game-logic');
const { Messages } = require('../properties/errors-and-messages');
const express = require('express');
const router = express.Router();

router.post('/start', async (req, res) => {
    req.body.players.map(player => {
        const { error } = validatePlayer(player);
        if (error) return res.status(400).send(error.details[0].message);
    });

    const { error } = validateGame({numberOfRounds: req.body.numberOfRounds});
    if (error) return res.status(400).send(error.details[0].message);

    let createdPlayers = [];

    await Player.create(req.body.players, async (err, data) => {       
        if (err) return res.status(400).send(err);
        createdPlayers = data;

        const game = new Game({
            players: createdPlayers,
            rounds: [],
            isPlaying: true,
            numberOfRounds: req.body.numberOfRounds
        });
        await game.save();
    
        res.status(200).send(game);
    });
});

router.put('/finish', async (req, res) => {
    const game = await Game.findById(req.body.gameId);
    if (!game) return res.status(400).send(Messages.INVALIDGAME);
    if (!game.isPlaying) return res.status(400).send(Messages.INACTIVEGAME);
    if (game.rounds.length < game.numberOfRounds) return res.status(400).send(Messages.ACTIVEGAME);

    const identifiers = [];
    game.rounds.map((round) => {
        identifiers.push(round.winner);
    });

    const count = getCountOfPoints(identifiers);
    const identifierOfWinner = getGameWinner(count);

    let winner = null;
    
    game.players.map((player) => {
        if(player.number === parseInt(identifierOfWinner)) winner = player;
    });

    game.winner = winner;
    game.isPlaying = false;
    await game.save();

    res.status(200).send(game);
})

module.exports = router;