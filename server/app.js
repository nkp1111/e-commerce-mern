const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")

// setting up config file path
require("dotenv").config({ path: "server/config/config.env" })

const errorMiddleware = require("./middleware/errors")

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(fileUpload())

// imports all routes 
const products = require("./routes/product")
const user = require("./routes/user")
const order = require("./routes/order")
const payment = require("./routes/payment")

app.use("/api/v1/", user)
app.use("/api/v1/", products)
app.use("/api/v1/", order)
app.use("/api/v1/", payment)

// error middleware 
app.use(errorMiddleware)

module.exports = app