const app = require("./app")
const databaseConnection = require("./config/database")

// setting up config file path
require("dotenv").config({ path: "server/config/config.env" })

const port = process.env.PORT

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
