const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [50, "Name must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validators: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [100, "Password must be less than 100 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordDate: Date,
})

// mongoose middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()
  this.password = await bcrypt.hash(this.password, 10)
})

// get user jwt token ot register and login
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  )
}

// compare password with user password
userSchema.methods.comparePassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password)
}

// send reset password token
userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex")
  // save hash token
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  // set expire time 30 minutes
  this.resetPasswordDate = Date.now() + 30 * 60 * 1000
  return resetToken
}

const User = mongoose.model("User", userSchema)

module.exports = User