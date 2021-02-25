const router = require('express').Router()
const { auth } = require('../middleware/auth')
module.exports = router

const {
  getChatsList,
  getChats,
  sendMessage,
  createRoom,
  getRooms
} = require('../controller/chat')
router.get('/:id', getChatsList)
router.get('/:id/room/:key', getChats)
router.get('/:key/:id', getRooms)
router.post('/:id/send', sendMessage)
router.post('/create/room', createRoom)
