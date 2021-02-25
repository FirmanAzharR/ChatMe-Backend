const router = require('express').Router()
const uploadImg = require('../middleware/multerProfile')
const { auth } = require('../middleware/auth')
module.exports = router

const {
  getProfile,
  updateProfile,
  changePassword,
  updateLocation,
  deleteImageProfile
} = require('../controller/profile')
router.get('/:id', getProfile)
router.patch('/delete-img', deleteImageProfile)
router.patch('/update-profile/:id', uploadImg, updateProfile)
router.patch('/update-profile/pass/:id', changePassword)
router.patch('/update-profile/maps/location/:id', updateLocation)
