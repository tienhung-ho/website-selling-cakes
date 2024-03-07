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

  async permissions(payload) {
    
    try {
      const data = transforms.transformData(payload)
      data.forEach( async item => {
        
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



}


module.exports = RolesServices
