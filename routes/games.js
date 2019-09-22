const { Game, validateGame } = require('../models/game');
const { Player, validatePlayer } = require('../models/player');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

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

module.exports = router;