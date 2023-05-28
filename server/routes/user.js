const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserPassword,
} = require("../controllers/userController")
const { isAuthenticatedUser } = require("../middleware/auth")


router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").post(logoutUser)
router.route("/me").get(isAuthenticatedUser, getUserProfile)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").post(resetPassword)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)



module.exports = router
