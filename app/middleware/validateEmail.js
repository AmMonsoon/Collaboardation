const {BadRequestError , AppValidationError} = require("../errors/index");

//validates the email if its present
const validateEmail = (req,res,next) => {    
    let { email } = req.body
        if(!email){
            return next(new BadRequestError("Email is required"))
        }
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailPattern.test(email)){
            return next(new AppValidationError(`Invalid email format`, "email"))
        }
        next()
    }

module.exports = validateEmail;
