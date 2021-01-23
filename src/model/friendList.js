const connection = require('../config/mysql')

module.exports = {
  searchFriendModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_id, user_email FROM USER WHERE user_email = ?',
        email,
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
  addFriendModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO friend_list SET?',
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id_list: result.insertId,
              ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  accFriendModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE friend_list SET friend_status = 1 WHERE id_user2 = ? AND id_user1 = ?',
        [data.id_user2, data.id_user1],
        (error, result) => {
          if (!error) {
            const newResult = {
              ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getFriendListModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friend_list JOIN PROFILE ON friend_list.id_user1 = profile.user_id WHERE friend_list.id_user2 = ${id} OR friend_list.id_user1 = ${id}  AND friend_list.friend_status=1`,
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
  getFriendReqModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friend_list JOIN PROFILE ON friend_list.id_user1 = profile.user_id WHERE friend_list.id_user2 = ${id} AND friend_list.friend_status=0`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
