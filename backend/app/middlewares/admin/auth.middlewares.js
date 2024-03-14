const jwt = require('jsonwebtoken')

module.exports.verifyRefreshToken = async (req, res, next) => {

  try {
    if (req.cookies.PayloadRefreshToken && req.cookies.SingatureRefreshToken) {
      if (req?.headers?.authorization?.startsWith('RefreshToken.Header.Payload')) {
        
        const headerPayloadRefreshToken = req.headers.authorization.split(' ')[1]

        const token = headerPayloadRefreshToken + '.' + req.cookies.SingatureRefreshToken
        jwt.verify(token, process.env.KEY_SECRET_REFRESH_TOKEN, (err, decode) => {
          if (err) {

            if (err.message === 'jwt expired') {
              return res.status(200).json({
                code: 401,
                success: false,
                message: 'Expired Token!',
              })
            }

            if (err.message === 'jwt signature is required') {
            
              return res.status(200).json({
                code: 404,
                success: false,
                message: err.message,
              })
            }

            if (err.message === 'jwt malformed') {
              return res.status(200).json({
                code: 403,
                success: false,
                message: err.message,
              })
            }

            return res.status(200).json({
              code: 500,
              message: err.message
            })
          }

          req.staff = decode
          return next()
        })
      }
    }
    else {
      return res.status(400).json({
        // code: 400,
        success: false,
        message: 'Require authentication!',
      })
    }
  }
  catch (err) {
    console.log(err);
    if (err.name == 'TokenExpiredError') {
      return res.status(200).json({
        code: 401,
        message: err.message
      })
    }


    return res.status(200).json({
      code: 500,
      message: err.message
    })
  }

}


module.exports.verifyAccessTokenTwoAuth = async (req, res, next) => {

  // console.log(req?.headers?.authorization?.startsWith('Bearer'));
  try {
    if (req.cookies.PayloadAccessToken && req.cookies.SingatureAccessToken) {
      if (req?.headers?.authorization?.startsWith('AccessToken.Header.Payload')) {

        const headerPayloadAccessToken = req.headers.authorization.split(' ')[1]
        const token = headerPayloadAccessToken + '.' + req.cookies.SingatureAccessToken
        jwt.verify(token, process.env.KEY_SECRET_TOKEN, (err, decode) => {
          if (err) {

            if (err.message === 'jwt expired') {
              return res.status(200).json({
                code: 401,
                success: false,
                message: 'Expired Token!',
              })
            }

            if (err.message === 'jwt signature is required') {
              return res.status(200).json({
                code: 404,
                success: false,
                message: err.message,
              })
            }

            if (err.message === 'jwt malformed') {
              return res.status(200).json({
                code: 403,
                success: false,
                message: err.message,
              })
            }

            return res.status(200).json({
              code: 500,
              message: err.message,

            })
          }

          req.staff = decode
          // console.log(decode);
          return next()
        })
      }
    }
    else {
      return res.status(400).json({
        // code: 400,
        success: false,
        message: 'Require authentication!',
      })
    }

  }
  catch (err) {
    console.log(err);
    if (err.name == 'TokenExpiredError') {
      return res.status(200).json({
        code: 401,
        message: err.message
      })
    }


    return res.status(200).json({
      code: 500,
      message: err.message
    })
  }

}

