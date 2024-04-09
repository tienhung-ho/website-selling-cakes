const express = require('express') 
const controllers = require('../../controllers/admin/order.controllers')

const router = express.Router()


router.route('/tracking')
  .get(controllers.orderTracking)


router.route('/change-status')
  .patch(controllers.changeStatus)


router.route('/')  
  .get(controllers.getAllOrders)




module.exports = router


