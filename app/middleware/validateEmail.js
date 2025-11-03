
//validates the email if its present
const validateEmail = (req,res,next) => {    
    let { email } = req.body
        if(!email){
            return next()
        }
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailPattern.test(email)){
            return res.status(400).json({ message: `Invalid email format`})
        }
        next()
    }

module.exports = validateEmail;
