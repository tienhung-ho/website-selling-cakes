const express = require('express') 
const controllers = require('../../controllers/admin/roles.controllers')

const router = express.Router()



router.route('/')
  .get(controllers.find)

  
router.route('/:id')
.get(controllers.findPermissionById)

router.route('/create')
  .post(controllers.create)

router.route('/permission')
  .patch(controllers.permission)  


module.exports = router


