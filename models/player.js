const mongoose = require('mongoose');
const Joi = require('joi');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    number: {
        type: Number,
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema);

function validatePlayer(player) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        number: Joi.number().required()
    }

    return Joi.validate(player, schema);
}

exports.Player = Player;
exports.validatePlayer = validatePlayer;