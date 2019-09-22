const mongoose = require('mongoose');
const Joi = require('joi');
const { playerSchema } = require('./player');

const roundSchema = new mongoose.Schema({
    optionPlayerOne: {
        type: Number,
        required: true
    },
    optionPlayerTwo: {
        type: Number,
        required: true
    },
    winner: {
        type: String,
        required: true
    }
});

const Round = mongoose.model('Round', roundSchema);

function validateRound(round) {
    const schema = {
        optionPlayerOne: Joi.number().required(),
        optionPlayerTwo: Joi.number().required(),
    }

    return Joi.validate(round, schema);
}

exports.Round = Round;
exports.roundSchema = roundSchema;
exports.validateRound = validateRound;