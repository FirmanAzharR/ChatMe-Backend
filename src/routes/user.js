const router = require('express').Router()

module.exports = router

const {
  registerUser,
  signInUser,
  forgotPass,
  updateUser,
  logoutUser
} = require('../controller/user')
router.post('/register', registerUser)
router.post('/signin', signInUser)
router.post('/forgot', forgotPass)
router.patch('/reset', updateUser)
router.patch('/logout', logoutUser)
