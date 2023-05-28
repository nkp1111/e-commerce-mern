const Order = require("../models/order")
const Product = require("../models/product")

const catchAsync = require("../middleware/catchAsync")
const ErrorHandler = require("../utils/errorHandler")

/**
 * @desc Create a new Order
 * @method POST /api/v1/order/new
 * @param {Object} shippingInfo - The shipping information
 * @param {Object} paymentInfo - The payment information
 * @param {Object} orderItems - The order items
 * @param {Number} shippingPrice
 * @param {Number} taxPrice
 * @param {Number} itemPrice
 * @param {Number} totalPrice
 */
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    shippingPrice,
    taxPrice,
    itemPrice,
    totalPrice,
  } = req.body

  const order = await Order.create({
    shippingInfo,
    paymentInfo,
    orderItems,
    shippingPrice,
    taxPrice,
    itemPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now()
  })

  res.status(200).json({ success: true, order })
})


/**
 * @desc Get Single order details
 * @method GET /api/v1/order/:id
 */
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (!order) {
    return next(new ErrorHandler("Order not found for this id", 400))
  }

  res.status(200).json({ success: true, order })
})


/**
 * @desc Get all my orders
 * @method GET /api/v1/order/me
 */
exports.getMyOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })

  res.status(200).json({ success: true, orders })
})