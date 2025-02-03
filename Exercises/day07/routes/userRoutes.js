const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const idValidatorMiddleware = require('../middlewares/idValidatorMiddleware');
const {id_userProfileMiddleware, userId_userProfileMiddleware} = require('../middlewares/userProfileMiddleware')
const {form_fileUploadFilter} = require('../middlewares/formsMiddleware')
const Authentication = require('../middlewares/Authentication')

const {fileUploadFilter, userId_imageMiddleware} = require('../middlewares/fileUploadMiddleware')


//users routes
router.get('/users',Authentication, userController.getAllUsers);

router.get('/users/:id', Authentication, idValidatorMiddleware, userController.getUserById);

//signup route for users
router.post('/signup', userController.createUser);

router.patch('/users/:id',Authentication, idValidatorMiddleware, userController.updateUser);

router.delete('/users/:id', Authentication, idValidatorMiddleware, userController.deleteUser);


// login route for users
router.post('/login', userController.loginUser);


//user-image routes
router.post('/upload-image/:id',Authentication, idValidatorMiddleware, fileUploadFilter, userController.uploadImage)

router.delete('/user-images/:userId',Authentication, userId_imageMiddleware, userController.deleteImage)

//user-profile routes
router.post('/user-profile',Authentication, userId_userProfileMiddleware, userController.createUserProfile);

router.get('/user-profile/:id', Authentication, id_userProfileMiddleware, userController.getUserProfile);

router.put('/user-profile/:id', Authentication, id_userProfileMiddleware, userController.updateUserProfile);

router.delete('/user-profile/:id', Authentication,id_userProfileMiddleware, userController.deleteUserProfile)

//user_forms routes
router.post('/user-forms', form_fileUploadFilter, userController.createForm)

module.exports = router;
