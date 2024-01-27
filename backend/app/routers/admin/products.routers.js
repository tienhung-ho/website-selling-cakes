const express = require('express') 
const controllers = require('../../controllers/admin/products.controllers')

const router = express.Router()

router.route('/')
  .get(controllers.find)

router.route('/liked')
.get(controllers.findLike)

router.route('/create')
.post(controllers.create)

router.route('/change-property')
.patch(controllers.changeStatus)


router.route('/:slug')
.get(controllers.findBySlug)

router.route('/edit/:slug')
.patch(controllers.edit)

router.route('/:id')
  .patch(controllers.changeStatus)
  .delete(controllers.delete)


module.exports = router

