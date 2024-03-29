const express = require('express') 
const controllers = require('../../controllers/admin/roles.controllers')

const router = express.Router()



router.route('/')
  .get(controllers.find)

  
router.route('/:id')
.get(controllers.findPermissionById)

router.route('/create')
  .post(controllers.create)

router.route('/slug/:slug')
  .get(controllers.findBySlug)

router.route('/edit/:slug')
  .patch(controllers.edit)

router.route('/permission')
  .patch(controllers.permission) 

router.route('/permission/data')
  .get(controllers.getPermission) 


module.exports = router


