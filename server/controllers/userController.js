const User = require("../models/user")

const ErrorHandler = require("../utils/errorHandler")
const catchAsync = require("../middleware/catchAsync")
const sendToken = require("../utils/jwtToken")

/**
 * @desc Registers a user on database 
 * @method POST /api/v1/user/register
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {String} image
 * @param {String} role
 */
exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, image } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Auth-app/en7jry5hrfndezuqynyp",
      url: "https://res.cloudinary.com/dxvkq8yw6/image/upload/v1683097350/Auth-app/en7jry5hrfndezuqynyp.jpg"
    }
  })

  sendToken(user, 200, res)
})

/**
 * @desc Login user
 * @param {string} email - the Email of the user
 * @param {string} password - the password of the user
 */
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // if no email or password
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password")
  // if user not found
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401))
  }

  // if password not match
  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid username or password", 401))
  }

  sendToken(user, 200, res)
})

/**
 * @desc Lout out user by clearing cookies
 */
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({ success: true, message: "Successfully Logged Out" })
})