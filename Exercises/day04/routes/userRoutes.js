const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const idValidatorMiddleware = require('../middlewares/idValidatorMiddleware');
const {uploadImage} = require('../controllers/imageController')

const {fileUploadFilter} = require('../middlewares/fileUploadMiddleware')



router.get('/users', userController.getAllUsers);

router.get('/users/:id', idValidatorMiddleware, userController.getUserById);

router.post('/users', userController.createUser);

router.patch('/users/:id', idValidatorMiddleware, userController.updateUser);

router.delete('/users/:id', idValidatorMiddleware, userController.deleteUser);

router.post('/upload-image/:id', fileUploadFilter, uploadImage)


module.exports = router;
