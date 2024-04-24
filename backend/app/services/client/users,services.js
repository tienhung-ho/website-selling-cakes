const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersModel = require('../../models/users.model')
const RolesServices = require('../../services/admin/roles.services')

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

  async create(payload) {

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
    const existStaff = await UsersModel.findOne({
      email: record.email,
      deleted: false
    })


    if (existStaff) {

      const corectUser = await bcrypt.compare(record.password, existStaff.password)

      if (corectUser) {

        const accessToken = genarate.genarateAccessToken(existStaff._id, existStaff.role_id)
        const refreshToken = genarate.genarateRefreshToken(existStaff._id)
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
        message: 'Không tìm thấy email',
      })
    }
  }

  async logout(res) {
    res.clearCookie('UserSingatureAccessToken');
    res.clearCookie('UserPayloadAccessToken');
    res.clearCookie('UserSingatureRefreshToken');
    res.clearCookie('UserPayloadRefreshToken');

    return {
      code: 200,
      message: 'Đăng xuất thành công!'
    }
  }

  async getStaffWithAccessToken(payload) {
    if (payload) {

      const rolesServices = new RolesServices()

      const user = await UsersModel.findOne({
        _id: payload._id
      }).select('-password')



      // const permissions = await rolesServices.findPermissionById(user.role_id)


      return user
    }
  }

  async getAccessTokenWithRefreshToken(payload) {
    if (payload) {

      const user = await UsersModel.findOne({
        _id: payload._id
      }).select('_id role_id')

      // console.log(user);
      const newAccesToken = genarate.genarateAccessToken(user._id, user.role_id)
      
      return newAccesToken
    }
  }

}


module.exports = UsersServices
