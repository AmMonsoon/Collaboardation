
const errorHandler = (err, req, res, next) => {
    console.log("❌ Error ❌: ", err);
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    return res.status(status).json({status: "error", message})
}

module.exports = errorHandler;