const Product = require("../models/product")

const ErrorHandler = require("../utils/errorHandler")
const catchAsync = require("../middleware/catchAsync")
const APIFeatures = require("../utils/apiFeatures")

/**
 * @method POST /api/v1/product/new
 * @desc Creates a new product
 */
exports.newProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(200).json({ success: true, product })
})

/**
 * @method GET /api/v1/products?keyword=value
 * @desc Get all products
 * @param {String} keyword
 */
exports.getProducts = catchAsync(async (req, res, next) => {
  const apiFeature = new APIFeatures(Product, req.query)
  const products = await apiFeature.search()
  res.status(200).json({ success: true, products })
})

/**
 * @method GET /api/v1/product/:id
 * @desc Get single product
 */
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  res.status(200).json({ success: true, product })
})

/**
 * @method PUT /api/v1/product/:id
 * @desc Update a product
 */
exports.updateProducts = catchAsync(async (req, res, next) => {
  // find product and update it
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
  // if product not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  res.status(200).json({ success: true, product })
})

/**
 * @method DELETE /api/v1/product/:id
 * @desc Delete a product
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  // find product by id
  const product = await Product.findById(req.params.id)
  // if product not found 
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  // delete product if exists
  await product.deleteOne({ _id: req.params.id })
  res.status(200).json({ success: true, message: "Product deleted" })
})