const connection = require('../config/mysql')

module.exports = {
  getProfileModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT*FROM USER JOIN PROFILE ON PROFILE.user_id = USER.user_id WHERE USER.user_id = ?',
        id,
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
  updateProfileModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE profile SET ? WHERE user_id = ?',
        [data, id],
        (error, result) => {
          const newResult = {
            ...data
          }
          if (!error) {
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updatePass: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [data, id],
        (error, result) => {
          const newResult = {
            ...data
          }
          if (!error) {
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
