const CustomError = require("./customError");

class AppValidationError extends CustomError{
    constructor(message = "Email is invalid", type = "validation", field = "email"){
        super(message, 422, type, field)
    }
}

module.exports = AppValidationError;