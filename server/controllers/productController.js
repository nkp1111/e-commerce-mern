
const Product = require("../models/product")

/**
 * @method POST /api/v1/product/new
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
 */
exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This is first route"
  })
}