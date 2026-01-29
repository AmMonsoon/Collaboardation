const { BadRequestError } = require("../errors/index")

const validateId = (paramId, modelName = "modelName") => {
    return (req, res, next) => {
        let rawId = req.params[paramId]
        let id = parseInt(rawId, 10);
        if(isNaN(id) || id <= 0) {
            return next(new BadRequestError(`Invalid ${modelName} ID`))
        }
        next()
    } 
} 

module.exports = validateId;
    