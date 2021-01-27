const router = require('express').Router()
const user = require('./routes/user')
const profile = require('./routes/profile')
const friendList = require('./routes/friendList')
const chat = require('./routes/chat')

router.use('/user', user)
router.use('/profile', profile)
router.use('/friend', friendList)
router.use('/chat', chat)
module.exports = router
