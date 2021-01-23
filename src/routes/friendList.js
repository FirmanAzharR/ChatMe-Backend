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
router.post('/:id', auth, searchFriend)
router.post('/add/:id', auth, addFriend)
router.patch('/acc/:id', auth, accFriend)
router.get('/list/:id', auth, getFriendList)
router.get('/list/req/:id', auth, getFriendReq)
