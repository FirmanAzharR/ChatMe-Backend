const router = require('express').Router()
const { auth } = require('../middleware/auth')
module.exports = router

const { getChatsList, getChats, sendMessage } = require('../controller/chat')
router.get('/:id', getChatsList)
router.get('/:id/room/:key', getChats)
router.post('/:id/send', sendMessage)
