const connection = require('../config/mysql')

module.exports = {
  registerModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...data
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  addProfile: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO profile SET?', data, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  cekUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_email FROM user WHERE user_email =  ?',
        data,
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
  signInModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT*FROM user WHERE user_email = ?',
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
  }
}
