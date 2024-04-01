const express = require('express') 
const controllers = require('../../controllers/admin/order.controllers')

const router = express.Router()


router.route('/order/tracking')
  .get(controllers.orderTracking)

router.route('/order')  
  .get(controllers.getAllOrders)




module.exports = router


