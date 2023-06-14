const Product = require("../models/product")

const ErrorHandler = require("../utils/errorHandler")
const catchAsync = require("../middleware/catchAsync")
const APIFeatures = require("../utils/apiFeatures")
const cloudinary = require("cloudinary").v2

/**
 * @method POST /api/v1/admin/product/new
 * @desc Creates a new product
 */
exports.newProduct = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id

  let images = typeof req.body.images === "string"
    ? [req.body.images]
    : req.body.images

  let imageLinks = []

  for (let image of images) {
    const result = await cloudinary.uploader.upload(image, {
      folder: "e-commerce"
    })

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imageLinks

  const product = await Product.create(req.body)
  res.status(200).json({ success: true, product })
})

/**
 * @method GET /api/v1/products?keyword=value&field[lte]=value&page=1
 * @desc Get all products
 * @param {String} keyword -search: keyword to search for items
 * @param {String/Integer} fields -filter: fields to filter
 * @param {Integer} page -pagination: to show the page
 */
exports.getProducts = catchAsync(async (req, res, next) => {
  const resPerPage = 4
  const totalCount = await Product.countDocuments()

  let apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

  let products = await apiFeature.query

  res.status(200)
    .json({
      success: true,
      totalCount,
      products,
      resPerPage,
    })
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

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  let images = typeof req.body.images === "string"
    ? [req.body.images]
    : req.body.images

  if (images && images.length > 0) {
    // delete image from cloudinary
    for (let image of product.images) {
      const result = await cloudinary.uploader.destroy(image.public_id)
    }

    let imageLinks = []

    for (let image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "e-commerce"
      })

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }

    req.body.images = imageLinks
  }

  product = await Product.findByIdAndUpdate(
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

  // delete image from cloudinary
  for (let image of product.images) {
    const result = await cloudinary.uploader.destroy(image.public_id)
  }
  // delete product if exists
  await product.deleteOne({ _id: req.params.id })
  res.status(200).json({ success: true, message: "Product deleted" })
})


//// review routes /////

/**
 * @method POST /api/v1/product/:id/review
 * @desc Create a review or update old review
 */
exports.createProductReview = catchAsync(async (req, res, next) => {
  // find product by id
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    date: Date.now()
  }

  const isReviewed = product.reviews.find(r => r?.user?.toString() === req?.user?._id?.toString())

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review?.user?.toString() === req.user._id.toString()) {
        review.rating = Number(rating)
        review.comment = comment
        date = Date.now()
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numOfReviews

  await product.save({ validateBeforeSave: false })
  res.status(200).json({ success: true })
})


/**
 * @desc Get all product reviews
 * @method GET /api/v1/product/:id/review
 */
exports.getProductAllReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  res.status(200).json({ success: true, reviews: product.reviews })
})


/**
 * @desc Delete a product review
 * @method DELETE /api/v1/product/:id/review/:reviewId
 */
exports.deleteProductReview = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  const reviews = product.reviews.filter(review => review._id.toString() !== req.params.reviewId.toString())

  await Product.findByIdAndUpdate(req.params.id, { reviews }, {
    new: true,
    // runValidators: true
  })

  res.status(200).json({ success: true })
})


// admin routes
/**
 * @method GET /api/v1/admin/products
 * @desc Get all products - admin routes
 */
exports.getAdminProducts = catchAsync(async (req, res, next) => {

  const products = await Product.find()

  res.status(200)
    .json({
      success: true,
      products,
    })
})