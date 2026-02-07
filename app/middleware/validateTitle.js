const { AppValidationError } = require("../errors/index")

//check if title is valid and not an empty string
const validateTitle = (req, res, next) =>{
    let { title } = req.body
    if(!title || title.trim() === ""){
        return next(new AppValidationError("Title is required", "title"))
    }
    if(title.length < 3){
        return next(new AppValidationError("Title must be at least 3 characters", "title"))
    }
    next()
}

module.exports = validateTitle;
