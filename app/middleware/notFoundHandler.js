
const notFoundHandler = (req, res, next) => {
    console.log(`Route ${req.originalUrl} not found`)
    const error = new Error(`Route ${req.originalUrl} not found`)
    error.status = 404
    next(error)
}

module.exports = notFoundHandler;