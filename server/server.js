const app = require("./app")
const databaseConnection = require("./config/database")

// setting up config file path
require("dotenv").config({ path: "server/config/config.env" })

const port = process.env.PORT

// connecting to database
databaseConnection().then(() => {
  // server listening on port
  app.listen(port, () => {
    console.log(`Server listening on port ${port} in ${process.env.NODE_ENV}`)
  })
})
