const express = require("express")
const router = express.Router()

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const { getProducts, newProduct, getSingleProduct, updateProducts, deleteProduct,
  createProductReview, getProductAllReviews, deleteProductReview } = require("../controllers/productController")

router.route("/products").get(getProducts)
router.route("/product/:id").get(getSingleProduct)

router.route("/product/:id/review")
  .post(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductAllReviews)

router.route("/product/:id/review/:reviewId")
  .delete(isAuthenticatedUser, deleteProductReview)

router.route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct)

router.route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)


module.exports = router


