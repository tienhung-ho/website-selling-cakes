
const StaffModel = require('../../models/staffs.model')


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

  async find (payload) {
    const records = await this.StaffModel.find({
      deleted: false
    })

    return records
  }

  async findBySlug (slug) {
    const record = await this.StaffModel.findOne({
      slug,
      deleted: false
    })

    return record
  }

  async create (payload) {
    
    const result = new StaffModel(payload)
    await result.save()
    console.log(result);
    return result
  }

  async edit (payload, slug) {
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

  async changeStatus (fullName, data) {
  
    const result = this.extractStaffData(data)

    const staff = await StaffModel.findOneAndUpdate({
      fullName: fullName,

    }, result,
    { new: true }
    )

    return staff

  }

  async delete (slug) {
    await this.StaffModel.findOneAndUpdate({
      slug
    },
    {
        deleted: true
      }
    )
  }

}


module.exports = StaffServices
