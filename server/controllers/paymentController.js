const catchAsync = require("../middleware/catchAsync")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

/**
 * @desc process stripe payment
 * @method POST /payment/process
 */
exports.processPayment = catchAsync(async (req, res, next) => {

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      currency: "inr",
      metadata: { integration_check: "accept_a_payment" }
    }
  )

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  })
})


/**
 * @desc Sends stripe api key
 * @method GET /stripe_api
 */
exports.sendStripeApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    apiKey: process.env.STRIPE_API_KEY,
  })
})