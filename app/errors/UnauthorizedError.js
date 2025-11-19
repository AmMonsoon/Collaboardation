const CustomError = require("./customError");

class UnauthorizedError extends CustomError{
    constructor(message = "Unauthorized Access", type = "unauthorized"){
        super(message, 401, type)
    }
}

module.exports = UnauthorizedError