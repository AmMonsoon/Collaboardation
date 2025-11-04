
const checkRequestBody = (req, res, next) => {
        //checks if request body is not empty
        if(Object.keys(req.body).length === 0){
        res.status(400).json({message: "No fields provided to update"})
        }
        next()
}

module.exports = checkRequestBody;