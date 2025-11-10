const { BadRequestError } = require("../errors/index")

const validateId = (modelName = "modelName") => {
    return (req, res, next) => {
        let id = parseInt(req.params.id, 10);
        if(isNaN(id) || id <= 0) {
            return next(new BadRequestError(`Invalid ${modelName} ID`))
        }
        next()
    } 
} 

module.exports = validateId;
    