const CustomError = require("./customError");

class BadRequestError extends CustomError{
    constructor(message = "Request body could not be read properly"){
        super(message, 400)
    }
}

module.exports = BadRequestError;