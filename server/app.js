const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middleware/errors")

app.use(express.json())
app.use(cookieParser())

// imports all routes 
const products = require("./routes/product")
const user = require("./routes/user")

app.use("/api/v1/", user)
app.use("/api/v1/", products)

// error middleware 
app.use(errorMiddleware)

module.exports = app