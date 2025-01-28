const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const idValidatorMiddleware = require('../middlewares/idValidatorMiddleware');
const userProfileMiddleware = require('../middlewares/userProfileMiddleware')
const {uploadImage} = require('../controllers/imageController')

const {fileUploadFilter} = require('../middlewares/fileUploadMiddleware')


//users routes-day04
router.get('/users', userController.getAllUsers);

router.get('/users/:id', idValidatorMiddleware, userController.getUserById);

router.post('/users', userController.createUser);

router.patch('/users/:id', idValidatorMiddleware, userController.updateUser);

router.delete('/users/:id', idValidatorMiddleware, userController.deleteUser);

router.post('/upload-image/:id', fileUploadFilter, uploadImage)


//user-profile-day05
router.post('/user-profile', userProfileMiddleware, userController.createProfile);

router.get('/user-profile/:id', idValidatorMiddleware, userController.getUserProfile);

router.put('/user-profile/:id', idValidatorMiddleware, userController.updateUserProfile);


module.exports = router;
