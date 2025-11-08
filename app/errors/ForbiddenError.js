const CustomError = require("./customError");

 class ForbiddenError extends CustomError{
    constructor(message = "Access Forbidden"){
        super(message, 403)
    }
 }
 
module.exports = ForbiddenError;