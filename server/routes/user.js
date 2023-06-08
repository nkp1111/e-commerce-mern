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
  updateUserProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/userController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")


router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").post(logoutUser)

router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").post(resetPassword)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)

router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers)
router.route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser)

module.exports = router
