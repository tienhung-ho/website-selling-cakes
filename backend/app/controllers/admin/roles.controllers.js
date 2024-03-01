
const RolesServices = require('../../services/admin/roles.services')


// [GET] admin/roles/
module.exports.find =  async (req, res, next) => {
  // let document = []
  const rolesServices = new RolesServices
  const roles = await rolesServices.find()

  res.json(roles)
}

// [GET] admin/roles/creare
module.exports.create =  async (req, res, next) => {
  
  const data = req.body.params

  if (data) {

    const rolesServices = new RolesServices
    const roles = rolesServices.create(data)
  
    res.json(roles)

  }



}

