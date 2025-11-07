const CustomError = require("./customError");

class ValidationError extends CustomError{
    constructor(message = "Could not vaildate field"){
        super(message, 409)
    }
}

module.exports = ValidationError;