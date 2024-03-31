
const OrdersServices = require('../../services/admin/orders.services')

// [GET] /api/user/order
module.exports.getAllOrders = async (req, res, next) => {
  try {
    const ordersServices = new OrdersServices()
    const result = await ordersServices.getAllOrders()

    res.json(result)
  }
  catch(err) {
    res.status(200).json({
      code: 500,
      message: 'Could not get orders!'
    })
  }
}


// [GET] /api/user/order
module.exports.orderTracking =  async (req, res, next) => {

  try {
    
    const user = req.body
    const userServices = new UsersServices()

    const result = await userServices.orderTracking()

    return res.status(200).json({
      code: 200,
      data: result
    })

  }
  catch(err) {
    res.status(200).json({
      code: 500,
      message: 'Wrong at get Oder!'
    })
  }

}

