const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersModel = require('../../models/user.model')


// genarate
const genarate = require('../../helpers/genarate.helpers')



class UsersServices {
  extractStaffData(payload) {
    const user = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      phone: payload.phone
    }

    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    )
    return user;
  }

  constructor() {
    this.UsersModel = UsersModel

  }

  async find(payload) {
    const records = await this.UsersModel.find({
      deleted: false
    })



    return records
  }

  async findBySlug(slug) {
    const record = await this.UsersModel.findOne({
      slug,
      deleted: false
    })

    return record
  }

  async register(payload) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    const hashedPassword = await bcrypt.hash(payload.password, salt)
    payload.password = hashedPassword


    const result = new UsersModel(payload)


    await result.save()

    return result
  }

  async edit(payload, slug) {
    // const sl = slug
    const data = this.extractStaffData(payload)
    // if (data.password) {

    // }
    // else {
    //   delete data.password
    // }

    await UsersModel.findOneAndUpdate({
      slug,
    },
      data
    )
    // return result
  }

  async changeStatus(fullName, data) {

    const result = this.extractStaffData(data)

    const user = await UsersModel.findOneAndUpdate({
      fullName: fullName,

    }, result,
      // { new: true }
    )
    return user

  }

  async delete(slug) {
    await this.UsersModel.findOneAndUpdate({
      slug
    },
      {
        deleted: true
      }
    )
  }

  async login(record) {
    const existUser = await UsersModel.findOne({
      username: record.username,
      deleted: false
    })

    if (existUser) {
      const corectUser = await bcrypt.compare(record.password, existUser.password)
      if (corectUser) {

        const accessToken = genarate.genarateAccessTokenOfUser(existUser._id, existUser.username)
        const refreshToken = genarate.genarateRefreshToken(existUser._id)
        return { accessToken, refreshToken }


      }
      else {
        return ({
          code: 404,
          message: 'Sai mật khẩu',
        })
      }


    }

    else {
      return ({
        code: 404,
        message: 'Không tìm thấy username',
      })
    }
  }

  async logout(res) {
    res.clearCookie('UserAccessToken');
    res.clearCookie('UserRefreshToken');
  

    return {
      code: 200,
      message: 'Đăng xuất thành công!'
    }
  }

  async getUserWithAccessToken(payload) {
    if (payload) {

      const user = await UsersModel.findOne({
        _id: payload._id
      }).select('-password')

      return user
    }
  }

  async getAccessTokenWithRefreshToken(payload) {
    if (payload) {

      const user = await UsersModel.findOne({
        _id: payload._id
      }).select('_id username')

      // console.log(user);
      const newAccesToken = genarate.genarateAccessTokenOfUser(user._id, user.username)
      
      return newAccesToken
    }
  }

}


module.exports = UsersServices
