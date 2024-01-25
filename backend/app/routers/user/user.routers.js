
const express = require('express') 
const controllers = require('../../controllers/user/users.controllers')

const router = express.Router()

router.route('/login')
  .post(controllers.loginUser)
  
router.route('/register')
  .post(controllers.createUser)


router.route('/information')
  .get(controllers.infomation)

router.route('/logout')
  .post(controllers.logout)

router.route('/cart')
  .post(controllers.find)

router.route('/delete-cart')
  .post(controllers.delete)

module.exports = router

