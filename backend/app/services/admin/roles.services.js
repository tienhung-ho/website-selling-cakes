const RolesModel = require('../../models/roles.models')

// helpers
const transforms = require('../../helpers/tranforms.helpers')


class RolesServices {
  extractStaffData(payload) {
    const role = {
      title: payload.title,
      description: payload.description,
      permissions: payload.permissions
    }

    Object.keys(role).forEach(
      (key) => role[key] === undefined && delete role[key]
    )
    return role;
  }

  constructor() {
    this.RolesModel = RolesModel

  }

  async find(_id) {
    const records = await this.RolesModel.find({
      deleted: false
    })

    return records
  }

  async findById(_id) {
    const records = await this.RolesModel.findOne({
      _id,
    })

    return records
  }

  async findBySlug(slug) {
    const record = await this.RolesModel.findOne({
      slug,
    }).select('-_id -permissions')

    return record
  }

  async findPermissionById(_id) {
    const records = await this.RolesModel.findOne({
      _id,
    }).select('permissions -_id')

    return records.permissions
  }

  async create(payload) {
    const role = this.extractStaffData(payload)

    if (role) {
      await this.RolesModel.create(
        role,
      )
    }
    else {
      throw Error({ message: 'Could not create!' })
    }

  }

  async edit(data, slug) {

   await this.RolesModel.findOneAndUpdate({
    slug,
   }, data)

   return data
  }


  async permissions(payload) {

    try {
      const data = await transforms.transformData(payload)
      data.forEach(async item => {
        // console.log(item);
        await this.RolesModel.findOneAndUpdate(
          {
            title: item.title
          },
          {
            permissions: item.options
          }
        )
      })


    } catch (error) {
      console.error(`Lỗi khi thực hiện cập nhật: ${error}`);
    }
  }

  async getPermissions() {

    try {

      const data = await this.RolesModel.find({
        deleted: false
      })

      const dataJson = await transforms.transformDataToJson(data)

      return dataJson

    } catch (error) {
      console.error(`Lỗi khi chuyển đổi dữ liệu: ${error}`);
    }
  }

}


module.exports = RolesServices
