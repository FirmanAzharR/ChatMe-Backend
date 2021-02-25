const {
  getChatList,
  getChat,
  checkRoom,
  makeRoomChat,
  sendMsg,
  getRoom,
  getLastMsg
} = require('../model/chat')
const helper = require('../helper/response')

module.exports = {
  getChatsList: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getChatList(id)
      const newResult = []
      for (let i = 0; i < result.length; i++) {
        const lastMsg = await getLastMsg(result[i].user1, result[i].key_room)
        const list = { ...result[i], ...lastMsg[0] }
        newResult.push(list)
      }
      return helper.response(response, 200, 'Get ChatList Success', newResult)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  getRooms: async (request, response) => {
    try {
      const { key, id } = request.params
      const result = await getRoom(key, id)
      return helper.response(response, 200, 'Get Room Success', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  getChats: async (request, response) => {
    try {
      const { id, key } = request.params
      const data = {
        id,
        key
      }
      const result = await getChat(data)
      return helper.response(response, 200, 'Get Chats Success', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  sendMessage: async (request, response) => {
    try {
      const { my_id, friend_id, key_room, message } = request.body
      const data = {
        user1: my_id,
        user2: friend_id
      }
      const dataRoom = {
        key_room,
        user1: my_id,
        user2: friend_id,
        create_at: new Date()
      }
      const dataRoom2 = {
        key_room,
        user1: friend_id,
        user2: my_id,
        create_at: new Date()
      }
      const dataMsg = {
        key_room,
        message,
        id_sender: my_id,
        id_reciver: friend_id,
        create_at: new Date()
      }
      const result = await checkRoom(data)
      if (result.length > 0) {
        const send = await sendMsg(dataMsg)
        return helper.response(response, 200, 'Message Sent', send)
      } else {
        const makeRoom = await makeRoomChat(dataRoom)
        const makeRoom2 = await makeRoomChat(dataRoom2)
        const send = await sendMsg(dataMsg)
        return helper.response(response, 200, 'Message Sent', send)
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  createRoom: async (request, response) => {
    try {
      const { my_id, friend_id, key_room } = request.body
      const data = {
        user1: my_id,
        user2: friend_id
      }
      const dataRoom = {
        key_room,
        user1: my_id,
        user2: friend_id,
        create_at: new Date()
      }
      const dataRoom2 = {
        key_room,
        user1: friend_id,
        user2: my_id,
        create_at: new Date()
      }
      const result = await checkRoom(data)
      if (result.length > 0) {
        return helper.response(response, 200, 'Room alredy exist')
      } else {
        const makeRoom = await makeRoomChat(dataRoom)
        const makeRoom2 = await makeRoomChat(dataRoom2)
        return helper.response(response, 200, 'Success Create Room')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  }
}
