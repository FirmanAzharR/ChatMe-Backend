const router = require('express').Router()
const user = require('./routes/user')
const profile = require('./routes/profile')
const friendList = require('./routes/friendList')

router.use('/user', user)
router.use('/profile', profile)
router.use('/friend', friendList)
module.exports = router
