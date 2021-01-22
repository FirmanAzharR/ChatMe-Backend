const multer = require('multer')
const helper = require('../helper/response')
const { getProfileModel } = require('../model/profile')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profileImages')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'application/octet-stream'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Extension file must be PNG , JPEG or webp'), false)
  }
}

const maxSize = 2 * 1024 * 1024
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
}).single('user_photo')

const uploadFilter = async (req, res, next) => {
  const { id } = req.params
  const checkId = await getProfileModel(id)
  if (checkId.length > 0) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return helper.response(res, 400, err.message)
      } else if (err) {
        return helper.response(res, 400, err.message)
      }
      next()
    })
  } else {
    return helper.response(res, 404, `ID ${id} is Not Found`)
  }
}
module.exports = uploadFilter

// const fs = require('fs')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/profileImages')
//   },
//   filename: function (req, file, cb) {
//     console.log(file)
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
//   }
// })

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true)
//   } else {
//     cb(new Error('Extension File Must be PNG or JPG'), false)
//   }
// }

// // kondisi kedua limit
// const limits = {
//   fileSize: 1 * 1024 * 1024 // 1 MB (max file size)
// }

// const upload = multer({ storage, limits, fileFilter }).single('user_photo')

// const uploadFilter = (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       console.log(err.message)
//       return helper.response(res, 400, err.message)
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       return helper.response(res, 400, err.message)
//     }
//     next()
//     // Everything went fine.
//   })
// }

// module.exports = uploadFilter

// const multer = require('multer')
// const { getProfilePekerjaModel } = require('../model/user')
// const helper = require('../helper/helper')
