const express = require('express') 
const controllersOrders = require('../../controllers/client/order.controllers')
const controllers = require('../../controllers/client/users.controllers')

const router = express.Router()


router.route('/order/tracking')
  .get(controllersOrders.orderTracking)

router.route('/order')
  .post(controllersOrders.createOrder)

router.route('/login')
  .post(controllers.login)



module.exports = router


