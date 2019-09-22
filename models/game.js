const mongoose = require('mongoose');
const Joi = require('joi');
const { playerSchema } = require('./player');
const { roundSchema } = require('./round');

const gameSchema = new mongoose.Schema({
    players: {
        type: [playerSchema],
        required: true
    },
    winner: {
        type: playerSchema,
        default: null
    },
    rounds: {
        type: [roundSchema]
    },
    isPlaying: Boolean,
    numberOfRounds: Number
});

const Game = new mongoose.model('Game', gameSchema);

function validateGame(game) {
    const schema = {
        numberOfRounds: Joi.number().required(),
    }

    return Joi.validate(game, schema);
}

exports.Game = Game;
exports.gameSchema = gameSchema;
exports.validateGame = validateGame;