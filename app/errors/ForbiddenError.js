const CustomError = require("./CustomError");

 class ForbiddenError extends CustomError{
    constructor(message = "Access Forbidden", type = "forbidden"){
        super(message, 403, type)
    }
 }
 
module.exports = ForbiddenError;