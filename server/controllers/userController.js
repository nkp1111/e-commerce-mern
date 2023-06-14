const crypto = require("crypto")
const cloudinary = require("cloudinary").v2

const User = require("../models/user")

const ErrorHandler = require("../utils/errorHandler")
const catchAsync = require("../middleware/catchAsync")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")

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

  const imgResult = await cloudinary.uploader
    .upload(image, {
      folder: "e-commerce",
      width: 150,
      crop: "scale",
    })

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: imgResult.public_id,
      url: imgResult.secure_url,
    }
  })

  sendToken(user, 200, res)
})


/**
 * @desc Login user
 * @method POST /api/v1/user/login
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
 * @desc Gives token to recover account with new password
 * @method POST /api/v1/password/forgot
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("Invalid email address, User not found", 404))
  }

  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
  const message = `
  You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link to reset your password:\n\n
  ${resetUrl}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n
  `

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset request",
      message,
    })

    res.status(200).json({
      success: true,
      message: "An email has been sent to " + user.email,
    })

  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordDate = undefined
    await user.save({ validateBeforeSave: false })
    next(new ErrorHandler(error.message, 500))
  }
})


/**
 * @desc Resets the password after verifying token
 * @method POST /api/v1/password/reset/:token
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body
  // get reset token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

  // check if user with same hash reset password token is present
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordDate: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or expired", 400))
  }
  // check if password and confirm password are same
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password and confirm password does not match", 400))
  }

  user.password = password
  user.resetPasswordDate = undefined
  user.resetPasswordToken = undefined
  await user.save()

  sendToken(user, 200, res)
})


/**
 * @desc Update current user password
 * @method PUT /api/v1/password/update
 * @param {String} oldPassword
 * @param {String} password
 * @param {String} confirmPassword
 */
exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, confirmPassword } = req.body
  const user = await User.findById(req.user.id).select("+password")
  // if no user is found
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  // if old password is different
  const isMatch = await user.comparePassword(oldPassword)
  if (!isMatch) {
    return next(new ErrorHandler("Old Password is incorrect", 404))
  }
  // if password and confirm password are not same
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password and confirmPassword are not same", 404))
  }

  user.password = password
  await user.save()
  sendToken(user, 200, res)
})


/**
 * @desc Get current user profile detail
 * @method GET /api/v1/me
 */
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  res.status(200).json({ success: true, user })
})


/**
 * @desc Update current user profile detail
 * @method PUT /api/v1/me/update
 * @param {String} name
 * @param {String} email
 */
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, email, image } = req.body
  const updatedInfo = {
    name,
    email
  }

  // image to do 
  if (image) {
    const user = await User.findById(req.user.id)
    const imageId = user.avatar.public_id
    const res = await cloudinary.uploader.destroy(imageId)

    const imgResult = await cloudinary.uploader
      .upload(image, {
        folder: "e-commerce",
        width: 150,
        crop: "scale",
      })

    updatedInfo.avatar = {
      public_id: imgResult.public_id,
      url: imgResult.secure_url,
    }
  }

  // update user info
  const user = await User.findByIdAndUpdate(
    req.user.id,
    updatedInfo,
    {
      new: true,
      runValidators: true
    })

  res.status(200).json({ success: true, user })
})


/**
 * @desc Lout out user by clearing cookies
 * @method POST /api/v1/user/logout
 */
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({ success: true, message: "Successfully Logged Out" })
})


//// admin routes /////

/**
 * @desc Get All users -admin route
 * @method GET /api/v1/admin/users
 */
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({ success: true, users })
})


/**
 * @desc Get User Detail -admin route
 * @method GET /api/v1/admin/user/:id
 * @param {String} id = id of the user to retrieve info
 */
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  res.status(200).json({ success: true, user })
})


/**
 * @desc Update user profile detail by admin
 * @method PUT /api/v1/admin/user/:id
 * @param {String} name
 * @param {String} email
 * @param {String} role
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  let { name, email, role } = req.body

  const updatedInfo = {}
  if (name) updatedInfo["name"] = name
  if (email) updatedInfo["email"] = email
  if (role) updatedInfo["role"] = role

  // update user info
  const user = await User.findByIdAndUpdate(
    req.params.id,
    updatedInfo,
    {
      new: true,
      runValidators: true
    })

  res.status(200).json({ success: true, user })
})


/**
 * @desc Delete a user by admin
 * @method DELETE /api/v1/admin/user/:id
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  // remove avatar from cloudinary
  const imageId = user.avatar.public_id
  const result = await cloudinary.uploader.destroy(imageId)

  await user.deleteOne()
  res.status(200).json({ success: true })
})