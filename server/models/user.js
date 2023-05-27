const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
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

const User = mongoose.model("User", userSchema)

module.exports = User