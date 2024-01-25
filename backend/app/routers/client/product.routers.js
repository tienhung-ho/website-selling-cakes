const express = require('express') 
const controllers = require('../../controllers/client/product.controllers')

const router = express.Router()

router.route('/')
  .get(controllers.find)

router.route('/:slug')
  .get(controllers.findBySlug)

  

module.exports = router
