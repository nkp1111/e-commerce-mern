const express = require("express")
const router = express.Router()

const { registerUser, loginUser } = require("../controllers/userController")


router.route("/user/register").post(registerUser)

router.route("/user/login").post(loginUser)

module.exports = router
