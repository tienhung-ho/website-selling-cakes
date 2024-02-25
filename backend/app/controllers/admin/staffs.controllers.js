const StaffModel = require('../../models/staffs.model')
const StaffService = require('../../services/admin/staffs.services')
const ProductCategory = require('../../services/admin/product-category.services')

// [GET] admin/staff/
module.exports.find =  async (req, res, next) => {
  try {
    const staffService = new StaffService
    const staffs =  await staffService.find({}) 

    if (!staffs) {
      res.send('Staffs not found')
    }
    return res.json(staffs)
  }
  catch (err) {
    console.log(err, "Err add find controller of staff");
  }
}

// [GET] admin/staff/:slug
module.exports.findBySlug =  async (req, res, next) => {
  try {

    const slug = req.params.slug

    const staffService = new StaffService
    const staff =  await staffService.findBySlug(slug) 

    if (!staff) {
      res.send('Staff not found')
    }
    return res.json(staff)
  }
  catch (err) {
    console.log(err, "Err add find controller of staff");
  }
}

// [POST] admin/staff/create
module.exports.create =  async (req, res, next) => {
  try {
    
    const data = req.body
    console.log(data);
    if (data) {
      const staffService = new StaffService()
      const records = staffService.create(data)
      if (!records) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json(records)
    }

  } 
  catch(err) {
    res.json({
      code: 400,
      message: "Can not create"
    })
  }
}

// [PATCH] admin/staff/edit/:slug
module.exports.edit =  async (req, res, next) => {
  try {
    
    const data = req.body

    const slug = req.params.slug
    if (data) {
      const staffService = new StaffService()

      if (data.avatar == '') {
        delete data.avatar
        
      }

      const records = staffService.edit(data, slug)
      if (!records) {
        return res.status(404).json({ error: 'Staff not found' });
      }

      return res.json({
        code: 200,
        message: "Edited!"
      })
    }

  } 
  catch(err) {
    res.json({
      code: 400,
      message: "Could not edit!"
    })
  }
}

// [PATCH] admin/staff/change-status
module.exports.changeStatus =  async (req, res, next) => {
  try {
    const { fullName, _ } = req.body.params
    
    if (!fullName) {
      res.send('Name do not exist!')
    }
    const data = req.body.params
    
    const staffService = new StaffService()
    const staff = staffService.changeStatus(fullName, data)
    
    return res.json(staff)
    
    // return res.json(staff)
  }
  catch (err) {
    console.log(err, "Err add find controller of staff");
  }
}

// [DELETE] admin/staff/delete
module.exports.delete =  async (req, res, next) => {
  try {
    
    const slug = req.params.slug
    if (slug) {
      const staffService = new StaffService()

      const records = staffService.delete(slug)
      if (!records) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.json({
        code: 200,
        message: "Edited!"
      })
    }

  } 
  catch(err) {
    res.json({
      code: 400,
      message: "Could not edit!"
    })
  }
}

