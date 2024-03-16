
  const StaffService = require('../../services/admin/staffs.services')
  const RolesServices = require('../../services/admin/roles.services')

  // genarate
  const genarate = require('../../helpers/genarate.helpers')


  // [GET] admin/staff/
  module.exports.find = async (req, res, next) => {
    try {
      const staffService = new StaffService
      const staffs = await staffService.find()

      if (!staffs) {
        res.send('Staffs not found')
      }

      const newStaffs = []

      const rolesServices = new RolesServices
      for (let staff of staffs) {
        let staffObj = staff.toObject()
        let role = await rolesServices.findById(staff.role_id);

        staffObj.role = role.title

        newStaffs.push(staffObj)

      }
      // console.log(newStaffs);

      return res.json(newStaffs)
    }
    catch (err) {
      console.log(err, "Err add find controller of staff");
    }
  }

  // [GET] admin/staff/:slug
  module.exports.findBySlug = async (req, res, next) => {
    try {

      const slug = req.params.slug

      const staffService = new StaffService
      const staff = await staffService.findBySlug(slug)

      if (!staff) {
        res.send('Staff not found')
        return
      }

      const rolesServices = new RolesServices

      let role = await rolesServices.findById(staff.role_id);

      return res.json({
        staff,
        role: role.title
      })
    }
    catch (err) {
      console.log(err, "Err add find controller of staff");
    }
  }

  // [POST] admin/staff/create
  module.exports.create = async (req, res, next) => {
    try {

      const data = req.body
      
      if (data.fullName) {
        const staffService = new StaffService()
        const records = await staffService.create(data)

        if (!records) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.json(records)
      }

    }
    catch (err) {
      return res.json({
        code: 400,
        message: "Can not create"
      })
    }
  }

  // [PATCH] admin/staff/edit/:slug
  module.exports.edit = async (req, res, next) => {
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
    catch (err) {
      return res.json({
        code: 400,
        message: "Could not edit!"
      })
    }
  }

  // [PATCH] admin/staff/change-status
  module.exports.changeStatus = async (req, res, next) => {
    try {
      const { fullName, _ } = req.body.params

      if (!fullName) {
        res.send('Name do not exist!')
      }
      const data = req.body.params
      const staffService = new StaffService()

      const staff = await staffService.changeStatus(fullName, data)
      
      return res.json(staff)

      // return res.json(staff)
    }
    catch (err) {
      console.log(err, "Err add find controller of staff");
    }
  }

  // [DELETE] admin/staff/delete
  module.exports.delete = async (req, res, next) => {
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
    catch (err) {
      return res.json({
        code: 400,
        message: "Could not edit!"
      })
    }
  }

  // [POST] /admin/staff/login
  module.exports.login = async (req, res) => {
    try {
      const record = req.body.data

      const staffService = new StaffService()

      const data  = await staffService.login(record)
      if (data && (data.accessToken || data.refreshToken) ) {

        const { accessToken, refreshToken } = data
        const [headerAccessToken, payloadAccessToken, singatureAccessToken] = accessToken.split('.')  
        const [headerRefreshToken, payloadRefreshToken, singatureRefreshToken] = refreshToken.split('.')  
        
    

        res.cookie('SingatureAccessToken', singatureAccessToken, {
          httpOnly: true,
          // maxAge: 1 * 60 * 60 * 1000,
        })

        res.cookie('PayloadAccessToken', headerAccessToken + '.' + payloadAccessToken, {
          // httpOnly: true,
          maxAge: 1 * 60 * 60 * 1000,
        })
        
        res.cookie('SingatureRefreshToken', singatureRefreshToken, {
          httpOnly: true,
          // maxAge: 1 * 60 * 60 * 1000,
        })

        res.cookie('PayloadRefreshToken', headerRefreshToken + '.' + payloadRefreshToken, {
          // httpOnly: true,
          maxAge: 1 * 60 * 60 * 1000,
        })

  
        return res.status(200).json({
          code: 200,
          message: 'Logined',
          // accessToken,
        })
      }
      else {
        // console.log(data);
        return res.status(200).json({
          ...data
        })
      }

      

    }
    catch(err) {
      return res.status(400).json({
        code: 400,
        message: 'Could not login!',
      })
    }
  }

  // [POST] /admin/staff/login
  module.exports.getStaffByAccessToken = async (req, res) => {
    try {
      
      const staffService = new StaffService()

      const record = req.staff

      const data = await staffService.getStaffWithAccessToken(record)


      return res.status(200).json(
        {
          ...data
        })
    }
    catch(err) {
      return res.json({
        code: 400,
        message: 'Could not login!',
      })
    }
  }

  // [GET] /admin/staff/refreshtoken
  module.exports.getAccessToken = async (req, res) => {
    try {
      
      const staffService = new StaffService()

      const record = req.staff

      const data = await staffService.getAccessTokenWithRefreshToken(record)

      if (data) {

        const accessToken = data
        const [headerAccessToken, payloadAccessToken, singatureAccessToken] = accessToken.split('.')   

        res.cookie('SingatureAccessToken', singatureAccessToken, {
          httpOnly: true,
          // maxAge: 1 * 60 * 60 * 1000,
        })

        res.cookie('PayloadAccessToken', headerAccessToken + '.' + payloadAccessToken, {
          // httpOnly: true,
          maxAge: 1 * 60 * 60 * 1000,
        })

        return res.status(200).json({
          code: 200,
          message: 'Got access token!',
          accessToken,
        })
      }
      else {
        console.log({ message: 'Staffs account not found!',});
        // return
        return res.status(400).json({
          code: 404,
          message: 'Staffs account not found!',
          // accessToken,
        })
      }


    }
    catch(err) {
      return res.status(200).json({
        code: 400,
        message: 'Could not get Access Token!',
      })
    }
  }

