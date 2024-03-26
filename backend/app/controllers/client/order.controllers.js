
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

