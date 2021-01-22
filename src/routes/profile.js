const router = require('express').Router()
const uploadImg = require('../middleware/multerProfile')
const { auth } = require('../middleware/auth')
module.exports = router

const { getProfile, updateProfile } = require('../controller/profile')
router.get('/:id', auth, getProfile)
router.patch('/update-profile/:id', auth, uploadImg, updateProfile)
