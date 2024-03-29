const express = require('express') 
const controllers = require('../../controllers/client/order.controllers')

const router = express.Router()


router.route('/order/tracking')
  .get(controllers.orderTracking)

router.route('/order')
  .post(controllers.createOrder)




module.exports = router


