const express = require('express') 
const controllersOrders = require('../../controllers/client/order.controllers')
const controllers = require('../../controllers/client/users.controllers')

const router = express.Router()

// middlewares
const middlewares = require('../../middlewares/client/auth.middlewares.js')

router.route('/order/tracking')
  .post(controllersOrders.orderTracking)

router.route('/order')
  .post(controllersOrders.createOrder)

router.route('/login')
  .post(controllers.login)

router.route('/register')
  .post(controllers.register)

router.route('/refreshtoken')
  .get(
    middlewares.verifyRefreshToken,
    controllers.getAccessToken
  )


router.route('/get-user')
  .get(
    middlewares.verifyAccessTokenTwoAuth,
    controllers.getUserByAccessToken
  )




module.exports = router


