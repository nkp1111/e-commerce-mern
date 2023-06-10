const router = require("express").Router();

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController")

router.route("/payment/process")
  .post(isAuthenticatedUser, processPayment)

router.route("/stripe_api")
  .get(isAuthenticatedUser, sendStripeApiKey)

module.exports = router;