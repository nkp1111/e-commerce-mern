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


//// admin routes ////

/**
 * @desc Get all orders - admin route
 * @method GET /api/v1/admin/orders
 */
exports.getAllOrders = catchAsync(async (req, res, next) => {

  let totalPrice = 0
  const orders = await Order.find()

  orders.forEach(order => totalPrice += order.totalPrice)

  res.status(200).json({ success: true, totalPrice, orders })
})


/**
 * @desc Update order - admin route
 * @method PUT /api/v1/admin/order/:id
 * note: this method needs improvement
 */
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  // if order item is already delivered
  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("Order is already delivered", 400))
  }

  // update each order item
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity)
  })

  order.orderStatus = req.body.status
  order.paidAt = Date.now()
  await order.save()

  res.status(200).json({ success: true })
})


/**
 * @desc Delete order - admin route
 * @method DELETE /api/v1/admin/order/:id
 */
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler("Order not found for this id", 400))
  }
  await order.deleteOne()

  res.status(200).json({ success: true })
})


/**
 * @desc Update product stocks 
 * @param {String} id - product id to update 
 * @param {Number} quantity - quantity to update 
 * note: this method is used to update the order in 'updateOrder' method defined
 */
async function updateStock(id, quantity) {
  const product = await Product.findById(id)

  if (product?.stock || 0 > quantity) {
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
  }
}
