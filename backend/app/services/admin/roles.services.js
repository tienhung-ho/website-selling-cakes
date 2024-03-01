const RolesModel = require('../../models/roles.models')


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

  async find (_id) {
    const records = await this.RolesModel.find({
      deleted: false
    })
    
    return records
  }

  async findById (_id) {
    const records = await this.RolesModel.findOne({
      _id,
    })
    
    return records
  }

  async create(payload) {
    const role = this.extractStaffData(payload)
    
    await this.RolesModel.create(
      role,
    )
  }


}


module.exports = RolesServices
