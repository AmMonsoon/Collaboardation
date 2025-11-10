const { BadRequestError } = require("../errors")

//check if title is valid and not an empty string
const validateTitle = (req, res, next) =>{
    let {title} = req.body
    if(!title || title.trim() === ""){
        return next(BadRequestError("Title must be valid"))
    }
    next()
}

module.exports = validateTitle;
