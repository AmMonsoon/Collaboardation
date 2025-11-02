const checkExists = (Model, modelName = "Model") => {
    return async(req, res, next) => {
        let id = parseInt(req.params.id, 10)
        let model = await Model.findByPk(id)
        if(!model){
            return res.status(404).json({ message: `${modelName} does not exist`})
        }
        req.model = model
        next()
    }
}

module.exports = checkExists;