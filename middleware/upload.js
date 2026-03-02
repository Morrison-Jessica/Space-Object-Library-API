// Handle image uploads for resource routes.
const fs = require('fs')
const path = require('path')
const multer = require('multer')

// Build a multer uploader scoped to one resource folder.
const buildUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const targetDir = path.join(__dirname, '..', 'public', 'uploads', folderName)
      fs.mkdirSync(targetDir, { recursive: true })
      cb(null, targetDir)
    },
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/\s+/g, '-')
      cb(null, `${Date.now()}-${safeName}`)
    }
  })

  const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'))
    }
    return cb(null, true)
  }

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  })
}

module.exports = buildUploader
