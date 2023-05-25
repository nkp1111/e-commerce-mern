const app = require("./app")

require("dotenv").config({ path: "server/config/config.env" })

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})