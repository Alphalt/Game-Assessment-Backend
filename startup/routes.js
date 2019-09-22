const express = require('express');
const games = require('../routes/games');
const rounds = require('../routes/rounds');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());

    app.use('/api/game', games);
    app.use('/api/round', rounds);

    app.use(error);
}