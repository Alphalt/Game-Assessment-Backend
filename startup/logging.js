const { createLogger, transports } = require('winston');
require('express-async-errors');

module.exports = function () {
    //For logging uncaught exceptions.
    const logger = createLogger({
        transports: [
            new transports.File({ filename: 'combined.log' })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'uncaughtExceptions.log' })
        ]
    });

    //For the unhandled exceptions from outside of Express.
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}