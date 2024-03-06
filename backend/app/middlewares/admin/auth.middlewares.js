const jwt = require('jsonwebtoken')

module.exports.verifyAccessToken = async (req, res, next) => {

  // console.log(req?.headers?.authorization?.startsWith('Bearer'));
  
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    // header { authorization: 'Bearer ....' }
    const token = req.headers.authorization.split(' ')[1]


    jwt.verify(token, process.env.KEY_SECRET_TOKEN, (err, decode) => {
      if(err) {
        return res.json({
          code: 400,
          success: false,
          message: 'Could not verify token!',
        })
      }

      req.staff = decode
      // console.log(decode);
      next()
    })
  }
  else {
    // return res.json({
    //   code: 400,
    //   success: false,
    //   message: 'Require authentication!',
    // })
  }
  
}
