const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {
  registerModel,
  signInModel,
  addProfile,
  cekUser,
  updateUser,
  cekUserKey
} = require('../model/user')
const { request } = require('express')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_fullname, user_email, user_password } = request.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const setData = {
        user_displayname: user_fullname,
        user_email,
        user_password: encryptPassword,
        user_created_at: new Date()
      }

      const cek = await cekUser(setData.user_email)
      if (cek.length > 0) {
        return helper.response(response, 400, 'Email alredy use')
      } else {
        const register = await registerModel(setData)
        if (register) {
          const profile = {
            user_id: register.user_id,
            user_fullname: user_fullname
          }
          const result = await addProfile(profile)
          return helper.response(response, 200, 'Register Success', register)
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  signInUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      const cekEmail = await signInModel(user_email)
      if (cekEmail.length > 0) {
        const checkPass = bcrypt.compareSync(
          user_password,
          cekEmail[0].user_password
        )

        if (checkPass) {
          const { user_id, user_name, user_email } = cekEmail[0]
          const payload = {
            user_id,
            user_name,
            user_email
          }
          const token = jwt.sign(payload, `${process.env.KEY}`, {
            expiresIn: '12h'
          })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Success Login', result)
        } else {
          return helper.response(response, 400, 'Wrong Password')
        }
      } else {
        return helper.response(response, 400, 'Email not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  forgotPass: async (request, response) => {
    try {
      const { user_email } = request.body
      const cekEmail = await signInModel(user_email)
      if (cekEmail.length > 0) {
        const data = {
          update_at: new Date(),
          key_reset: require('crypto').randomBytes(15).toString('hex')
        }
        await updateUser(data, user_email)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASS}`
          }
        })
        const mailOPtion = {
          from: `"ChatMe App "${process.env.EMAIL}`,
          to: `${user_email}`,
          subject: `Hello ${user_email}`,
          html: `<a href="http://localhost:8080?key=${data.key_reset}&page=reset">Click This link to update your password</a>`
        }
        transporter.sendMail(mailOPtion, (err, result) => {
          if (err) {
            return helper.response(response, 400, 'Error Send Email', err)
          } else {
            return helper.response(
              response,
              200,
              'Check your email to renew your password'
            )
          }
        })
      } else {
        return helper.response(response, 400, 'Email not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  updateUser: async (request, response) => {
    try {
      const { key, password } = request.body
      const result = await cekUserKey(key)
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)
      const data = {
        user_password: encryptPassword,
        update_at: new Date()
      }
      if (result.length > 0) {
        const reset = await updateUser(data, result[0].user_email)
        return helper.response(response, 200, 'Success reset password')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  }
}
