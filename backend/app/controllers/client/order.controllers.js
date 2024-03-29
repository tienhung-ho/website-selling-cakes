
const UsersServices = require('../../services/client/users.serivces')


// [POST] /api/user/order
module.exports.createOrder =  async (req, res, next) => {

  try {
    const { data, user } = req.body
  
    const usersServices = new UsersServices()
  
    const result = await usersServices.createOffer(data, user)
    
  
    return

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

