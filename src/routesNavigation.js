const router = require('express').Router()
const user = require('./routes/user')
const profile = require('./routes/profile')

router.use('/user', user)
router.use('/profile', profile)
module.exports = router
