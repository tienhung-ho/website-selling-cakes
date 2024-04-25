const UsersService = require('../../services/client/users.services')

// [POST] /user/login
module.exports.login = async (req, res) => {
  try {
    const record = req.body.user

    const userService = new UsersService()

    const data = await userService.login(record)
    if (data && (data.accessToken || data.refreshToken)) {

      const { accessToken, refreshToken } = data
    

      res.cookie('UserAccessToken', accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
      })

      res.cookie('UserRefreshToken', refreshToken, {
        httpOnly: true,
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

// [POST] user/register
module.exports.register = async (req, res, next) => {
  try {

    const data = req.body.user
    if (data.username) {
      const userService = new UsersService()
      const records = await userService.register(data)

      if (!records) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(records)
    }

  }
  catch (err) {
    return res.json({
      code: 400,
      message: "Can not register!!"
    })
  }
}

// [POST] /admin/staff/logout
module.exports.logout = async (req, res) => {
  if (req.cookies.PayloadAccessToken) {

    const userService = new UsersService()

    const data = await userService.logout(res)

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

    const userService = new UsersService()

    const record = req.user
    const data = await userService.getUserWithAccessToken(record)

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
    const userService = new UsersService()

    const record = req.user

    const data = await userService.getAccessTokenWithRefreshToken(record)

    if (data) {

      const accessToken = data


      res.cookie('UserAccessToken', accessToken, {
        httpOnly: true,
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
