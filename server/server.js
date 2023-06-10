const app = require("./app")
const databaseConnection = require("./config/database")
const cloudinary = require("cloudinary").v2

const port = process.env.PORT || 4000

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"]
})

// handle uncaught exceptions
process.on("uncaughtException", err => {
  console.log("Error: " + err.message)
  console.log("Error Stack: " + err.stack)
  console.log("Shutting down due to uncaught exception")
  process.exit(1)
})

// connecting to database
databaseConnection()
// server listening on port
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port} in ${process.env.NODE_ENV}`)
})

// unhandled rejections
process.on("unhandledRejection", err => {
  console.log("Error: " + err.stack)
  console.log("shutting down the server due to unhandled rejection")
  server.close(() => process.exit(1))
})
