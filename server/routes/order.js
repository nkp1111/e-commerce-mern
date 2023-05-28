const express = require("express")
const router = express()

const { isAuthenticatedUser } = require("../middleware/auth")
const { newOrder, getMyOrder, getSingleOrder } = require("../controllers/orderController")

router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/me").get(isAuthenticatedUser, getMyOrder)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

module.exports = router