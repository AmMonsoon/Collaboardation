const NotFoundError = require("../errors/NotFoundError")

const checkExists = (paramId, Model, modelName = "Model") => {
    return async(req, res, next) => {
        let rawId = req.params[paramId]
        let id = parseInt(rawId, 10)
        let model = await Model.findByPk(id)
        if(!model){
            return next(new NotFoundError(`${modelName} not found`))
        }
        req.model = model
        next()
    }
}

module.exports = checkExists;