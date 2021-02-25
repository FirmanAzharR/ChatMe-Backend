const connection = require('../config/mysql')

module.exports = {
  searchFriendModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.user_id,profile.user_status,profile.user_fullname,profile.user_photo,user.user_email FROM profile JOIN user ON profile.user_id = user.user_id WHERE user.user_email = ?',
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
        'INSERT INTO friend_list SET ?',
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
  accFriendModel2: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE friend_list SET friend_status = 1 WHERE id_user1 = ? AND id_user2 = ? ',
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
        `SELECT * FROM PROFILE JOIN friend_list ON profile.user_id = friend_list.id_user2 WHERE friend_list.id_user1 = ${id} AND friend_list.friend_status = 1`,
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
        `SELECT*FROM PROFILE JOIN friend_list ON profile.user_id = friend_list.id_user2  WHERE friend_list.friend_status=0 AND friend_list.id_user1 = ${id} AND friend_list.friend_status=0 AND friend_list.status='req'`,
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
