const express = require('express');
const router = express.Router();
const multer = require('multer')
const userController = require('../controllers/userController');
const path = require('node:path')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('__dirname:', process.cwd());

    cb(null, './public')
    console.log("enter in storage");

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().getTime()
    cb(null, uniqueSuffix + '-' + file.originalname)
    console.log("enter in filename");
  }
})

function checkFileType(file, cb) {

  const filetypes = /jpg|png/;
  const extname = filetypes.test(path.extname(String(file.originalname)).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  const fileSizes = 2 * 1000 * 1000;
  if (file.size > fileSizes) {
    cb(new Error('file should not exceed 2MB in size'), false);
  }

  if (!mimetype && !extname) {
    cb(new Error('file should be iether .png or .jpg!'), false)
  }
  return cb(null, true);

}

const upload = multer({
  storage: storage, limits: { fileSize: 2 * 1000 * 1000 }, fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
})

router.post('/upload-image/:id', upload.single('userfiles'), userController.uploadImage)

module.exports = router;