const Product = require("../models/product")
// const User = require("../models/user")

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
    // // add user to all seed products 
    // const user = await User.findOne()
    // product = product.map(product => {
    //   product.user = user._id
    // })
    await Product.create(product, { validateBeforeSave: false })
    console.log("products created")
  } catch (error) {
    console.log(error)
  }
}

/**
 * @desc Starts a new seeding process
 */
const startSeeding = async () => {
  try {
    // connect to the database
    await connectDatabase()
    // seed the database with dummy data
    await seedProducts()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit(1)
  }
}

startSeeding()