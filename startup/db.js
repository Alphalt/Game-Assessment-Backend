const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    const db = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/game-assessment-db';
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => winston.info(`Connected to database...`))
    .catch((error) => winston.error(`Error to connect to the database ${error}`));
}