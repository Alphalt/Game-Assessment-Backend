const mongoose = require('mongoose');
const Joi = require('joi');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 255
    },
    number: {
        type: Number,
    }
});

const Player = mongoose.model('Player', playerSchema);

function validatePlayer(player) {
    const schema = {
        name: Joi.string().max(255).required(),
        number: Joi.number().required()
    }

    return Joi.validate(player, schema);
}

exports.Player = Player;
exports.playerSchema = playerSchema;
exports.validatePlayer = validatePlayer;