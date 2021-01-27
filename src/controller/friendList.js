const {
  searchFriendModel,
  addFriendModel,
  accFriendModel,
  accFriendModel2,
  getFriendListModel,
  getFriendReqModel
} = require('../model/friendList')
const helper = require('../helper/response')

module.exports = {
  searchFriend: async (request, response) => {
    try {
      const { user_email } = request.body
      const result = await searchFriendModel(user_email)
      if (result.length > 0) {
        return helper.response(response, 200, 'Get Data Success', result)
      } else {
        return helper.response(response, 403, 'User Not Found')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  addFriend: async (request, response) => {
    try {
      const { user_email, user_id } = request.body
      const result = await searchFriendModel(user_email)
      if (result.length > 0) {
        const setData = {
          id_user1: user_id,
          id_user2: result[0].user_id,
          friend_status: 0,
          created_at: new Date(),
          status: ''
        }
        const setData2 = {
          id_user1: result[0].user_id,
          id_user2: user_id,
          friend_status: 0,
          created_at: new Date(),
          status: 'req'
        }
        const add = await addFriendModel(setData)
        const add2 = await addFriendModel(setData2)
        return helper.response(response, 200, 'Success Add Friend', add)
      } else {
        return helper.response(response, 200, 'User not found')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  accFriend: async (request, response) => {
    try {
      const { user1, user2 } = request.body
      const setData = {
        id_user2: user2,
        id_user1: user1
      }
      const setData2 = {
        id_user1: user1,
        id_user2: user2
      }
      const result = await accFriendModel(setData)
      const result2 = await accFriendModel2(setData2)
      return helper.response(response, 200, 'Success acc friend', result2)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  getFriendList: async (request, response) => {
    try {
      const { id } = request.params
      const setData = {
        id_user2: id
      }
      const result = await getFriendListModel(setData.id_user2)
      return helper.response(response, 200, 'Success get friend list', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  getFriendReq: async (request, response) => {
    try {
      const { id } = request.params
      const setData = {
        id_user2: id
      }
      const result = await getFriendReqModel(setData.id_user2)
      return helper.response(
        response,
        200,
        'Success get friend request',
        result
      )
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  }
}
