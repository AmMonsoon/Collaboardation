const CustomError = require("./customError");

class UnauthorizedError extends CustomError{
    constructor(message = "Unauthorized Access"){
        super(message, 401)
    }
}

module.exports = UnauthorizedError