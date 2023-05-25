const mongoose = require("mongoose")

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Mongo DB connected")
  } catch (error) {
    console.log("Error connecting to database")
    console.log(error)
  }
}

module.exports = databaseConnection