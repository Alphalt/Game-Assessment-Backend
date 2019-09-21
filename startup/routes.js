const express = require('express');
const players = require('../routes/players');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());

    app.use('/api/players', players);

    app.use(error);
}