const connection = require('../config/mysql')
module.exports = {
  getChatList: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT room_chat.key_room, room_chat.user1,room_chat.user2,chat.message,chat.create_at, profile.user_fullname FROM PROFILE JOIN room_chat ON profile.user_id = room_chat.user2 JOIN chat ON room_chat.key_room = chat.key_room WHERE room_chat.user1 = ${id} GROUP BY room_chat.key_room ORDER BY(chat.create_at) DESC`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getChat: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT profile.user_fullname,room_chat.key_room, room_chat.user1,room_chat.user2,chat.id_sender,chat.id_reciver,chat.message,chat.create_at FROM PROFILE JOIN room_chat ON profile.user_id = room_chat.user2 JOIN chat ON room_chat.key_room = chat.key_room WHERE room_chat.user1 = ${data.id} AND room_chat.key_room = ${data.key}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  checkRoom: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT*FROM room_chat WHERE user1 = ${data.user1} AND user2 = ${data.user2}`,
        (error, result) => {
          if (!error) {
            resolve(result)
            console.log(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  makeRoomChat: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room_chat SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(result)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  sendMsg: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
          console.log(result)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  }
}
