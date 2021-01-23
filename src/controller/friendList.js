const {
  searchFriendModel,
  addFriendModel,
  accFriendModel,
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
          created_at: new Date()
        }
        const add = await addFriendModel(setData)
        return helper.response(response, 200, 'Success Add Friend', add)
      } else {
        return helper.response(response, 200, 'User not found')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  accFriend: async (request, response) => {
    try {
      const { id_user2, id_user1 } = request.body
      const setData = {
        id_user2,
        id_user1
      }
      const result = await accFriendModel(setData)
      return helper.response(response, 200, 'Success acc friend', result)
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
