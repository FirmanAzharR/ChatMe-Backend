const router = require('express').Router()

module.exports = router

const { registerUser, signInUser } = require('../controller/user')
router.post('/register', registerUser)
router.post('/signin', signInUser)
//router.patch('/change-pass', signInUser)
