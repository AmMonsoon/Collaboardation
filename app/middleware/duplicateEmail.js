const { ConflictError } = require('../errors/index')
const {User} = require('../models/Index')

//checks for a duplicate email if present
const duplicateEmail = async (req, res, next) => {
    let { email } = req.body

    if(!email){
        return next()
    }
    
    if(req.model && email === req.model.email) return next()

    const existingEmail = await User.findOne({where: { email }})
    if(existingEmail){
        return next(new ConflictError("Email already in use"))
    }
    next()

}

module.exports = duplicateEmail;