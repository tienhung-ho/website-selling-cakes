
const OrdersServices = require('../../services/admin/orders.services')

// [GET] /api/user/orders
module.exports.getAllOrders = async (req, res, next) => {
  try {
    let conditions = {}
    if (!req.query || Object.keys(req.query).length === 0) {
      // console.log('req.query is empty or does not exist');
      // return
    }
    else {
      conditions.createdAtDate = req.query.date
    }
    const ordersServices = new OrdersServices()
    const result = await ordersServices.getAllOrders(conditions)

    res.json(result)
  }
  catch(err) {
    res.status(200).json({
      code: 500,
      message: 'Could not get orders!'
    })
  }
}


// [GET] /api/user/orders/tracking
module.exports.orderTracking =  async (req, res, next) => {

  try {
    
    const order = req.body
    const ordersServices = new OrdersServices()

    const result = await ordersServices.orderTracking()

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

// [PATCH] /api/user/orders/change-status
module.exports.changeStatus =  async (req, res, next) => {

  try {
    
    const id = req.body.params._id
    const conditions =  req.body.params.conditions
    
    if (id) {

      const ordersServices = new OrdersServices()
      const result = await ordersServices.update(id, conditions)

      return res.status(200).json({
        code: 200,
        data: result
      })
    }

  }
  catch(err) {
    res.status(200).json({
      code: 500,
      message: 'Wrong at get Oder!'
    })
  }

}




