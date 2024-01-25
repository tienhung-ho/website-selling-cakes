const express = require('express')
const cors = require('cors')
require("dotenv").config()
const sysConfig = require('./app/config/system.js')

const database = require('./app/config/database.js')

const clientRoute = require('./app/routers/client')
const adminRoute = require('./app/routers/admin')
const userRoute = require('./app/routers/user')
// const Products = require('./app/models/products.model.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const port = 3000

database.connect()

const app = express()

app.locals.prefixApi = sysConfig.prefix_api
app.locals.prefixAdmin = sysConfig.prefix_admin

app.use(cors())
app.use(cookieParser())

app.use(bodyParser.json());
app.use(express.json())

clientRoute(app)
adminRoute(app)
userRoute(app)



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

