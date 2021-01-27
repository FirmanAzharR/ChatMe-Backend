const router = require('express').Router()
const { auth } = require('../middleware/auth')
module.exports = router

const {
  searchFriend,
  addFriend,
  accFriend,
  getFriendList,
  getFriendReq
} = require('../controller/friendList')
router.post('/:id', searchFriend)
router.post('/add/:id', addFriend)
router.patch('/acc/:id', accFriend)
router.get('/list/:id', getFriendList)
router.get('/list/req/:id', getFriendReq)
