
const RolesServices = require('../../services/admin/roles.services')


// [GET] admin/roles/
module.exports.find =  async (req, res, next) => {
  // let document = []
  const rolesServices = new RolesServices
  const roles = await rolesServices.find()

  res.json(roles)
}

// [POST] admin/roles/creare
module.exports.create =  async (req, res, next) => {
  
  const data = req.body.params

  if (data) {

    const rolesServices = new RolesServices
    const roles = rolesServices.create(data)
  
    res.json(roles)

  }
  else {
    res.json({
      code: 400,
      message: "Data not found, could not create!"
    })
  }
}

// [PATCH] admin/roles/permission
module.exports.permission =  async (req, res, next) => {
  
  const permissions = req.body.params

  if (permissions.length > 0) {

    const rolesServices = new RolesServices
    const roles = rolesServices.permissions(permissions)
  
    res.json(roles)

  }
  else {
    res.json({
      code: 400,
      message: "Data not found, could not create!"
    })
  }
}

