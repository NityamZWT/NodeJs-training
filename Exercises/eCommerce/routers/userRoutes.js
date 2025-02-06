const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController')

const authentication = require('../middlewares/authentication');

//handling user routes

//get users profile
router.get('/profile',authentication('admin','customer'),userControllers.getProfile);
// update user profile
router.put('/profile',authentication('admin','customer'),userControllers.updateProfile);
//get all profile(admin access)
router.get('/',authentication('admin'),userControllers.getAllProfile);




module.exports = router