const BadRequestError = require("../errors/BadRequestError")

const checkUserFields = (req, res, next) => {

    const {username, email} = req.body         
    //username required and cannot be an empty string
    if(!username || username.trim() === ""){
        return next(new BadRequestError("Username Required"))
    }
    // checks for email and cannot be an empty string
    if(!email || email.trim() === ""){
        return next(new BadRequestError("Email Required"))
    }
    next()
}

module.exports = checkUserFields;