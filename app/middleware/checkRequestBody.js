const BadRequestError = require("../errors/BadRequestError");

const checkRequestBody = (req, res, next) => {
        //checks if request body is not empty
   if(Object.keys(req.body).length === 0){
      return next(new BadRequestError("No fields provided to update"))
   }
next()
}

module.exports = checkRequestBody;