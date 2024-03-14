const express = require('express') 
const controllers = require('../../controllers/admin/staffs.controllers')

const router = express.Router()

// upload image
// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

// middlewares
const middlewares = require('../../middlewares/admin/auth.middlewares.js')

router.route('/')
  .get(controllers.find)

router.route('/get/:slug')
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


router.route('/login') 
  .post(controllers.login)

router.route('/get-staff') 
  .get(
    middlewares.verifyAccessTokenTwoAuth,
    controllers.getStaffByAccessToken
    )

router.route('/refreshtoken')
    .get(
      middlewares.verifyRefreshToken,
      controllers.getAccessToken
    )

module.exports = router


