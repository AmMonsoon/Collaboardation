const CustomError = require("./CustomError");

class BadRequestError extends CustomError{
    constructor(message = "Request body could not be read properly", type = "bad_request"){
        super(message, 400, type)
    }
}

module.exports = BadRequestError;