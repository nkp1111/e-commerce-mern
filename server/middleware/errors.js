const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {

  if (process.env.NODE_ENV.trim() === "development") {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: err.stack,
    })
  }
  else {
    let error = { ...err }
    error.message = err.message || "Internal Server Error"

    // handling mongoose cast error
    if (err.name === "CastError") {
      const message = `Resource not found: ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    // handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(value => value.message)
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    })
  }
}