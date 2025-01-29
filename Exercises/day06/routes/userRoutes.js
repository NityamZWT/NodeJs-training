const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const idValidatorMiddleware = require('../middlewares/idValidatorMiddleware');
const {id_userProfileMiddleware, userId_userProfileMiddleware} = require('../middlewares/userProfileMiddleware')
const {form_fileUploadFilter} = require('../middlewares/formsMiddleware')
const imageController = require('../controllers/imageController')

const {fileUploadFilter, userId_imageMiddleware} = require('../middlewares/fileUploadMiddleware')


//users routes
router.get('/users', userController.getAllUsers);

router.get('/users/:id', idValidatorMiddleware, userController.getUserById);

router.post('/users', userController.createUser);

router.patch('/users/:id', idValidatorMiddleware, userController.updateUser);

router.delete('/users/:id', idValidatorMiddleware, userController.deleteUser);

//user-image routes
router.post('/upload-image/:id', idValidatorMiddleware, fileUploadFilter, imageController.uploadImage)

router.delete('/user-images/:userId', userId_imageMiddleware, imageController.deleteImage)

//user-profile routes
router.post('/user-profile', userId_userProfileMiddleware, userController.createUserProfile);

router.get('/user-profile/:id', id_userProfileMiddleware, userController.getUserProfile);

router.put('/user-profile/:id', id_userProfileMiddleware, userController.updateUserProfile);

router.delete('/user-profile/:id',id_userProfileMiddleware, userController.deleteUserProfile)

//user_forms routes
router.post('/user-forms', form_fileUploadFilter, userController.createForm)

module.exports = router;
