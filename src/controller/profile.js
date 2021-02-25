const bcrypt = require('bcrypt')
const {
  getProfileModel,
  updateProfileModel,
  updatePass
} = require('../model/profile')
const helper = require('../helper/response')
const fs = require('fs')

module.exports = {
  getProfile: async (request, response) => {
    try {
      const { id } = request.params
      console.log(id)
      const getProfile = await getProfileModel(id)
      return helper.response(response, 200, 'Get Data Success', getProfile)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  changePassword: async (request, response) => {
    try {
      const {
        old_password,
        new_password,
        confirm_password,
        user_id
      } = request.body
      const getProfile = await getProfileModel(user_id)
      if (getProfile.length > 0) {
        const checkPass = bcrypt.compareSync(
          old_password,
          getProfile[0].user_password
        )
        if (checkPass) {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(new_password, salt)
          if (new_password === confirm_password) {
            const data = {
              user_password: encryptPassword,
              update_at: new Date()
            }
            const change = await updatePass(data, user_id)
            return helper.response(
              response,
              200,
              'Success change password',
              change
            )
          }
        } else {
          return helper.response(response, 400, 'Wrong old password')
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  updateProfile: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_name,
        user_fullname,
        user_phone,
        user_bio,
        lat,
        lng
      } = request.body

      const data = {
        user_name,
        user_fullname,
        user_phone,
        user_bio,
        user_photo: request.file === undefined ? '' : request.file.filename,
        updated_at: new Date(),
        lat,
        lng
      }
      // console.log(data)

      const cekProfile = await getProfileModel(id)
      if (cekProfile.length > 0) {
        if (data.user_photo) {
          if (data.user_photo !== cekProfile[0].user_photo) {
            fs.unlink(
              `./uploads/profileImages/${cekProfile[0].user_photo}`,
              function (err) {
                if (err) {
                  console.log('image not found')
                }
                console.log('Image Update Old File deleted!')
              }
            )
          }
        } else {
          delete data.user_photo
          console.log('Update without img!')
        }
      }
      const result = await updateProfileModel(data, id)
      return helper.response(response, 200, 'Update Data Success', result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  deleteImageProfile: async (request, response) => {
    try {
      const { id } = request.body
      const data = {
        user_photo: '',
        updated_at: new Date()
      }
      const cekProfile = await getProfileModel(id)
      if (cekProfile.length > 0) {
        fs.unlink(
          `./uploads/profileImages/${cekProfile[0].user_photo}`,
          function (err) {
            if (err) {
              console.log('image not found')
            }
          }
        )
        const result = await updateProfileModel(data, id)
        return helper.response(response, 200, 'Remove Image Success', result)
      } else {
        return helper.response(response, 400, 'User not found')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  updateLocation: async (request, response) => {
    try {
      const { id } = request.params
      const { lat, lng } = request.body
      const data = {
        updated_at: new Date(),
        lat,
        lng
      }
      const cekProfile = await getProfileModel(id)
      if (cekProfile.length > 0) {
        const result = await updateProfileModel(data, id)
        return helper.response(response, 200, 'Updating Location', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad request', error)
    }
  }
}
