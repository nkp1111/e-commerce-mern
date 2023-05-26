module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}