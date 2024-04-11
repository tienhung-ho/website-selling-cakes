
const RolesServices = require('../../services/admin/roles.services')


// [GET] admin/roles/
module.exports.find =  async (req, res, next) => {
  // let document = []
  const rolesServices = new RolesServices
  const roles = await rolesServices.find()

  return res.json(roles)
}

// [GET] admin/roles/:id
module.exports.findPermissionById =  async (req, res, next) => {
  // let document = []
  try {
    const id = req.params.id
    if (id) {
      const rolesServices = new RolesServices
      const roles = await rolesServices.findPermissionById(id)
    
      return res.json(roles)
    }
    else {
      return res.json({
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

// [GET] admin/roles/slug/:slug
module.exports.findBySlug =  async (req, res, next) => {
  // let document = []
  try {
    const slug = req.params.slug
    if (slug) {
      const rolesServices = new RolesServices
      const role = await rolesServices.findBySlug(slug)
    
      return res.json(role)
    }
    else {
      return res.json({
        code: 404,
        message: 'Could not found slug'
      })
    }

  }
  catch(err) {
    return res.json({
      code: 500,
      message: 'Could not found data to client!'
    })
  }
}


// [POST] admin/roles/create
module.exports.create =  async (req, res, next) => {
  
  const data = req.body.params

  if (data) {

    const rolesServices = new RolesServices
    const roles = await rolesServices.create(data)
  
    return res.json(roles)

  }
  else {
    return res.json({
      code: 400,
      message: "Data not found, could not create!"
    })
  }
}

// [PATCH] admin/roles/create
module.exports.edit =  async (req, res, next) => {
  
  const data = req.body.params
  const slug = req.params.slug

  if (data) {

    const rolesServices = new RolesServices
    const roles = await rolesServices.edit(data, slug)
  
    return res.status(200).json({
      code: 200,
      message: 'Updated!!'
    })

  }
  else {
    return res.json({
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
    
      return res.json(roles)
  
    }
    else {
      return res.json({
        code: 400,
        message: "Data not found, could not create!"
      })
    }
  }
  catch(err) {
    return res.json({
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
    return res.json({
      code: 200,
      message: 'Completed get permissions!',
      data: roles
    })
  }
  catch(err) {
    return res.json({
      code: 400,
      message: 'Could not get permisson!'
    })

  }
  
}

