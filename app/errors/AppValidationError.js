const CustomError = require("./customError");

class AppValidationError extends CustomError{
    constructor(message = "Validation Failed"){
        super(message, 422)
    }
}

module.exports = AppValidationError;