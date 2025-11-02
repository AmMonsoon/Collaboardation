

const validateId = (req, res, next, modelName = "modelName") => {
    let id = parseInt(req.params.id, 10);

    if(isNaN(id) || id <= 0) {
        return res.status(400).json({ message: `Invalid ${modelName} ID` });
    }
    next()
} 
module.exports - validateId;
    