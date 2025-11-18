
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.log("❌ Error:", err);

  // Handle custom application errors
  if (err.isCustom) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
      details: err.details || null,
      field: err.field || null,
      type: err.type || "custom_error",
    });
  }

  // Handle unexpected errors
  const status = err.status || 500;

  return res.status(status).json({
    status: "error",
    message: err.message || "Internal Server Error",
    type: "unexpected_error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;

module.exports = errorHandler;