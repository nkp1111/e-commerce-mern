const jwt = require("jsonwebtoken")

const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsync = require("../middleware/catchAsync")

/**
 * @desc User Authentication with cookies
 */
exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler("Please Login first", 400))
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  )

  req.user = await User.findById(decoded.id)
  next()
})