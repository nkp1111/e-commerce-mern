
const Product = require("../models/product")

const ErrorHandler = require("../utils/errorHandler")

/**
 * @method POST /api/v1/product/new
 * @desc Creates a new product
 */
exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json({ success: true, product })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @method GET /api/v1/products/
 * @desc Get all products
 */
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json({ success: true, products })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @method GET /api/v1/product/:id
 * @desc Get single product
 */
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({ success: true, product })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @method PUT /api/v1/product/:id
 * @desc Update a product
 */
exports.updateProducts = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

/**
 * @method DELETE /api/v1/product/:id
 * @desc Delete a product
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    // find product by id
    const product = await Product.findById(req.params.id)
    // if product not found 
    if (!product) {
      return next(new ErrorHandler("Product not found", 404))
    }
    // delete product if exists
    await product.deleteOne({ _id: req.params.id })
    res.status(200).json({ success: true, message: "Product deleted" })
  } catch (error) {
    console.log(error)
  }
}