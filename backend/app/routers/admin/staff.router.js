const express = require('express') 
const controllers = require('../../controllers/admin/staffs.controllers')

const router = express.Router()

// upload image
// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')



router.route('/')
  .get(controllers.find)

router.route('/:slug')
  .get(controllers.findBySlug)


router.route('/create')
  .post(
    upload.single('avatar'),
    uploadCloud.upload,
    controllers.create)

router.route('/edit/:slug')
  .patch(
    upload.single('avatar'),
    uploadCloud.upload,
    controllers.edit)

router.route('/change-status')
  .patch(controllers.changeStatus)

router.route('/delete/:slug')
  .delete(controllers.delete)

module.exports = router


