const express = require("express")
const router = express.Router()

const { isAuthenticatedUser } = require("../middleware/auth")

const { getProducts, newProduct, getSingleProduct, updateProducts, deleteProduct } = require("../controllers/productController")

router.route("/products").get(isAuthenticatedUser, getProducts)
router.route("/product/:id").get(getSingleProduct)

router.route("/admin/product/new").post(newProduct)
router.route("/admin/product/:id")
  .put(updateProducts)
  .delete(deleteProduct)

module.exports = router


