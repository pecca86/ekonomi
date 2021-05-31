/* Custom error handling */
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    // Take in all error messages from err
    let error = { ...err };
    error.message = err.message;
    
    console.log(err.stack); // print out error stack to console

    // Mongoose bad ObjectId
    if ( err.name === 'CastError') {
        const message = `Resource with id ${err.value} not found!`;
        error = new ErrorResponse(message, 404);
    }

    // Monhoose duplicate key (when set to unique)
    if ( err.code === 11000) {
        const message = "Key / field value already taken."
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error.'
    });
}

module.exports = errorHandler;