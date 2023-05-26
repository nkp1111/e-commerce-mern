const Product = require("../models/product")

require("dotenv").config({ path: "server/config/config.env" })
const connectDatabase = require("../config/database")

const product = require("../data/product.json")

/**
 * @desc seed database with dummy products
 */
const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log("products deleted")
    await Product.create(product)
    console.log("products created")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// connect to the database
connectDatabase().then(() => {
  // seed the database with dummy data
  seedProducts()
})