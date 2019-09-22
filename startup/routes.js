const express = require('express');
const cors = require('cors');
const games = require('../routes/games');
const rounds = require('../routes/rounds');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(cors());

    app.use('/api/game', games);
    app.use('/api/round', rounds);

    app.use(error);
}