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
    return next(new ErrorHandler("Please Login first to access resources", 400))
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  )

  req.user = await User.findById(decoded.id)
  next()
})

/**
 * @desc Check if user role is allowed to access the resource
 * @param  {...any} roles 
 * @returns 
 */
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) does not have permission to access this resource`, 403))
    }
    next()
  }
}