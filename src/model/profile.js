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
    console.log(data)
    console.log(id)
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
  }
}
