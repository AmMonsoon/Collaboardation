const NotFoundError = require("../errors/NotFoundError")

const checkExists = (Model, modelName = "Model") => {
    return async(req, res, next) => {
        let id = parseInt(req.params.id, 10)
        let model = await Model.findByPk(id)
        if(!model){
            return next(new NotFoundError(`${modelName} not found`))
        }
        req.model = model
        next()
    }
}

module.exports = checkExists;