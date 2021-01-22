const { getProfileModel, updateProfileModel } = require('../model/profile')
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
  updateProfile: async (request, response) => {
    try {
      const { id } = request.params
      const { user_name, user_fullname, user_phone, user_bio } = request.body

      const data = {
        user_name,
        user_fullname,
        user_phone,
        user_bio,
        user_photo: request.file === undefined ? '' : request.file.filename,
        updated_at: new Date()
      }
      console.log(data)

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
  }
}
