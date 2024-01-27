const express = require('express') 
const controllers = require('../../controllers/admin/flavor.controllers')

const router = express.Router()

router.route('/')
  .get(controllers.find)

router.route('/:slug')
  .get(controllers.filterByCategory)

router.route('/product/:slug')
  .get(controllers.findByProuduct)

module.exports = router


