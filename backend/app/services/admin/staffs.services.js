const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const StaffModel = require('../../models/staffs.model')
const RolesServices = require('../../services/admin/roles.services')

// genarate
const genarate = require('../../helpers/genarate.helpers')



class StaffServices {
  extractStaffData(payload) {
    const staff = {
      fullName: payload.fullName,
      deleted: payload.deleted,
      status: payload.status,
      role_id: payload.role_id,
      phone: payload.phone,
      password: payload.password,
      avatar: payload.avatar,
      slug: payload.slug
    }

    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    )
    return staff;
  }

  constructor() {
    this.StaffModel = StaffModel

  }

  async find(payload) {
    const records = await this.StaffModel.find({
      deleted: false
    })



    return records
  }

  async findBySlug(slug) {
    const record = await this.StaffModel.findOne({
      slug,
      deleted: false
    })

    return record
  }

  async create(payload) {

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    const hashedPassword = await bcrypt.hash(payload.password, salt)
    payload.password = hashedPassword


    const result = new StaffModel(payload)


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

    await StaffModel.findOneAndUpdate({
      slug,
    },
      data
    )
    // return result
  }

  async changeStatus(fullName, data) {

    const result = this.extractStaffData(data)

    const staff = await StaffModel.findOneAndUpdate({
      fullName: fullName,

    }, result,
      // { new: true }
    )
    return staff

  }

  async delete(slug) {
    await this.StaffModel.findOneAndUpdate({
      slug
    },
      {
        deleted: true
      }
    )
  }

  async login(record) {
    const existStaff = await StaffModel.findOne({
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
    res.clearCookie('SingatureAccessToken');
    res.clearCookie('PayloadAccessToken');
    res.clearCookie('SingatureRefreshToken');
    res.clearCookie('PayloadRefreshToken');

    return {
      code: 200,
      message: 'Đăng xuất thành công!'
    }
  }

  async getStaffWithAccessToken(payload) {
    if (payload) {

      const rolesServices = new RolesServices()

      const staff = await StaffModel.findOne({
        _id: payload._id
      }).select('-password')



      // const permissions = await rolesServices.findPermissionById(staff.role_id)


      return staff
    }
  }

  async getAccessTokenWithRefreshToken(payload) {
    if (payload) {

      const staff = await StaffModel.findOne({
        _id: payload._id
      }).select('_id role_id')

      // console.log(staff);
      const newAccesToken = genarate.genarateAccessToken(staff._id, staff.role_id)
      
      return newAccesToken
    }
  }

}


module.exports = StaffServices
