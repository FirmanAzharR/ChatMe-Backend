const router = require('express').Router()

module.exports = router

const {
  registerUser,
  signInUser,
  forgotPass,
  updateUser
} = require('../controller/user')
router.post('/register', registerUser)
router.post('/signin', signInUser)
router.post('/forgot', forgotPass)
router.patch('/reset', updateUser)
