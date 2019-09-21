const { Player, validatePlayer } = require('../models/player');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
    req.body.players.map(player => {
        const { error } = validatePlayer(player);
        if (error) return res.status(400).send(error.details[0].message);
    });

    await Player.create(req.body.players, (data, err) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(data);
    });
});

module.exports = router;