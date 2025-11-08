


const customErrors = {
    AppValidationError: require("./AppValidationError"),
    NotFoundError: require("./NotFoundError"),
    BadRequestError: require("./BadRequestError"),
    ConflictError: require("./ConflictError"),
    ForbiddenError: require("./ForbiddenError"),
    UnauthorizedError: require("./UnauthorizedError")
}

module.exports = customErrors;