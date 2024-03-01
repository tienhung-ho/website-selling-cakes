const express = require('express') 
const controllers = require('../../controllers/admin/roles.controllers')

const router = express.Router()



router.route('/')
  .get(controllers.find)


router.route('/create')
  .post(controllers.create)


module.exports = router


