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
  cekUserKey: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_id,user_email,key_reset FROM user WHERE key_reset =  ?',
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
  updateUser: (data, mail) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_email=?',
        [data, mail],
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
