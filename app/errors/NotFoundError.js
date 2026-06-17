const CustomError = require("./CustomError");

class NotFoundError extends CustomError{
    constructor(message = "Resource Not Found", type = "not_found"){
        super(message, 404, type)
    }
}

module.exports = NotFoundError;