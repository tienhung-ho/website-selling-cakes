
const OrdersServices = require('../../services/client/orders.serivces')


// [POST] /api/user/order
module.exports.createOrder =  async (req, res, next) => {

  try {
    const { data, user, order } = req.body
    
    console.log(user);

    const ordersServices = new OrdersServices()
  
    const result = await ordersServices.createOffer(data, user, order)
    
  
    return res.status(200).json({
      code: 200,
      message: 'Created!'
    })

  }
  catch(err) {
    res.status(200).json({
      code: 500,
      message: 'Wrong at create Oder!'
    })
  }

}

// [GET] /api/user/order
module.exports.orderTracking =  async (req, res, next) => {

  try {
    
    const user = req.body.user
    
    const userServices = new OrdersServices()

    const result = await userServices.orderTracking(user)

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

