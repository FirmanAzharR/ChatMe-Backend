const mysql = require('mysql')
require('dotenv').config({ path: '../../.env' })

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ChatMe!123',
  database: 'telegramapp',
  timezone: 'UTC',
  insecureAuth: true
})

connection.connect((error) => {
  if (error) {
    console.log(`Turn on the database! ${error}`)
  } else {
    console.log('You are now connected to database ...')
  }
})

module.exports = connection
