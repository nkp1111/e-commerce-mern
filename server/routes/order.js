const express = require("express")
const router = express()

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const { newOrder, getMyOrder, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")

router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/me").get(isAuthenticatedUser, getMyOrder)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders)
router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder)

module.exports = router