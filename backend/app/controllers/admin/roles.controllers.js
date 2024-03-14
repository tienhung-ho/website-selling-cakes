
const RolesServices = require('../../services/admin/roles.services')


// [GET] admin/roles/
module.exports.find =  async (req, res, next) => {
  // let document = []
  const rolesServices = new RolesServices
  const roles = await rolesServices.find()

  res.json(roles)
}

// [GET] admin/roles/:id
module.exports.findPermissionById =  async (req, res, next) => {
  // let document = []
  try {
    const id = req.params.id
    if (id) {
      const rolesServices = new RolesServices
      const roles = await rolesServices.findPermissionById(id)
    
      res.json(roles)
    }
    else {
      res.json({
        code: 404,
        message: 'Could not found Id'
      })
    }

  }
  catch(err) {
    res.json({
      code: 500,
      message: 'Could not found data to client!'
    })
  }
}


// [POST] admin/roles/creare
module.exports.create =  async (req, res, next) => {
  
  const data = req.body.params

  if (data) {

    const rolesServices = new RolesServices
    const roles = await rolesServices.create(data)
  
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
  try {
    const permissions = req.body.params
  
    if (permissions.length > 0) {
  
      const rolesServices = new RolesServices
      const roles = await rolesServices.permissions(permissions)
    
      res.json(roles)
  
    }
    else {
      res.json({
        code: 400,
        message: "Data not found, could not create!"
      })
    }
  }
  catch(err) {
    res.json({
      code: 400,
      message: "Could no receive the data!"
    })
  }
}

// [GET] admin/roles/permission
module.exports.getPermission =  async (req, res, next) => {
  try {

    const rolesServices = new RolesServices
    const roles = await rolesServices.getPermissions()
    res.json({
      code: 200,
      message: 'Completed get permissions!',
      data: roles
    })
  }
  catch(err) {
    res.json({
      code: 400,
      message: 'Could not get permisson!'
    })

  }
  
}

