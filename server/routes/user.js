const express = require("express")
const router = express.Router()

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controllers/userController")


router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").post(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").post(resetPassword)

module.exports = router
