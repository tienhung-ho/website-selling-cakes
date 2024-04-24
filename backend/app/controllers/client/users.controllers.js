

// [POST] /user/login
module.exports.login = async (req, res) => {
  try {
    const record = req.body.data

    const staffService = new StaffService()

    const data = await staffService.login(record)
    if (data && (data.accessToken || data.refreshToken)) {

      const { accessToken, refreshToken } = data
      const [headerAccessToken, payloadAccessToken, singatureAccessToken] = accessToken.split('.')
      const [headerRefreshToken, payloadRefreshToken, singatureRefreshToken] = refreshToken.split('.')



      res.cookie('UserSingatureAccessToken', singatureAccessToken, {
        httpOnly: true,
        // maxAge: 1 * 60 * 60 * 1000,
      })

      res.cookie('UserPayloadAccessToken', headerAccessToken + '.' + payloadAccessToken, {
        // httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
      })

      res.cookie('UserSingatureRefreshToken', singatureRefreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      res.cookie('UserPayloadRefreshToken', headerRefreshToken + '.' + payloadRefreshToken, {
        // httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })


      return res.status(200).json({
        code: 200,
        message: 'Logined',
        // accessToken,
      })
    }
    else {
      // console.log(data);
      return res.status(200).json({
        ...data
      })
    }



  }
  catch (err) {
    return res.status(400).json({
      code: 400,
      message: 'Could not login!',
    })
  }
}

// [POST] /admin/staff/logout
module.exports.logout = async (req, res) => {
  if (req.cookies.PayloadAccessToken) {

    const staffService = new StaffService()

    const data = await staffService.logout(res)

    res.status(200).json({
      ...data
    })
  }
  else {
    res.status(200).json({
      code: 300,
      message: 'Chưa đăng nhập!!!'
    })
  }
}

// [POST] /admin/staff/login
module.exports.getUserByAccessToken = async (req, res) => {
  try {

    const staffService = new StaffService()

    const record = req.staff

    const data = await staffService.getStaffWithAccessToken(record)


    return res.status(200).json(
      {
        ...data
      })
  }
  catch (err) {
    return res.json({
      code: 400,
      message: 'Could not login!',
    })
  }
}

// [GET] /admin/staff/refreshtoken
module.exports.getAccessToken = async (req, res) => {
  try {

    const staffService = new StaffService()

    const record = req.staff

    const data = await staffService.getAccessTokenWithRefreshToken(record)

    if (data) {

      const accessToken = data
      const [headerAccessToken, payloadAccessToken, singatureAccessToken] = accessToken.split('.')

      res.cookie('UserSingatureAccessToken', singatureAccessToken, {
        httpOnly: true,
        // maxAge: 1 * 60 * 60 * 1000,
      })

      res.cookie('UserPayloadAccessToken', headerAccessToken + '.' + payloadAccessToken, {
        // httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        code: 200,
        message: 'Got access token!',
        accessToken,
      })
    }
    else {
      console.log({ message: 'User account not found!', });
      // return
      return res.status(400).json({
        code: 404,
        message: 'User account not found!',
        // accessToken,
      })
    }


  }
  catch (err) {
    return res.status(200).json({
      code: 400,
      message: 'Could not get Access Token!',
    })
  }
}
