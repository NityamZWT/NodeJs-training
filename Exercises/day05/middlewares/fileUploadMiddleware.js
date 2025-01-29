const multer = require('multer')
const path = require('node:path')
const {userIdSchema} = require('../validators/uservalidator')
const db = require('../config/config')


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
}).single('userfiles');

 const fileUploadFilter = (req, res, next) => {
   
   upload(req, res, function (err) {
    console.log('file',req.file);
    if(!req.file){
      return res.status(400).json({message:'image not found!'})
    }
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(404).json({
          message: "Only one file is allowed. Please upload a single file.",
        });
      }
      return res.status(404).json({ message: err.message });
    }
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    const fileSizeInBytes = req.file.size;
    const maxFileSizeInBytes = 2 * 1024 * 1024;
    if (fileSizeInBytes > maxFileSizeInBytes) {
      return res.status(404).json({
        message: "File size exceeds 2 MB. Please upload a smaller file.",
      });
    }
    next();
  })
};


const userId_imageMiddleware = async(req, res,next)=>{
  const Id = parseInt(req.params.userId);
  const { error } = userIdSchema.validate({ id: Id});

  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }
  const query = `select 1 from user_images where user_images.userId = ?`;
  const values = [Id];
  const image = await db.query(query,values);
  console.log("user",image[0]);
  
  
  // const user = users.find((user) => user.id === userId);
  if (image[0].length===0) {
    console.log('in');
    
      return res.status(404).json({ message: "User not found!!!" });
  }
  next();
}

module.exports = {fileUploadFilter, userId_imageMiddleware} 
