class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // call parent constructor (Error)
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
