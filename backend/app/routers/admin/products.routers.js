const express = require('express')
const controllers = require('../../controllers/admin/products.controllers')


// upload image
// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')



const router = express.Router()

router.route('/')
  .get(controllers.find)

router.route('/all')
  .get(controllers.all)

router.route('/liked')
  .get(controllers.findLike)

router.route('/create')
  .post(
    upload.single('thumbnail'),
    uploadCloud.upload,
    controllers.create)

router.route('/change-property')
  .patch(controllers.changeStatus)

router.route('/change-multiple')
  .patch(controllers.changeMultiple)


router.route('/:slug')
  .get(controllers.findBySlug)

router.route('/edit/:slug')
  .patch(
    upload.single('thumbnail'),
    uploadCloud.upload,
    controllers.edit)

router.route('/:id')
  .patch(controllers.changeStatus)
  .delete(controllers.delete)


module.exports = router

