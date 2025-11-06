
const errorHandler = (err, req, res, next) => {
  // Prevent duplicate responses if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  console.log("❌ Error:", err);

  // Handle Custom Errors
  if (err.isCustom) {
    return res.status(err.status).json({
      status: "error",
      message: err.message
    });
  }

  // Handle Unexpected Errors
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    status: "error",
    message
  });
};

module.exports = errorHandler;