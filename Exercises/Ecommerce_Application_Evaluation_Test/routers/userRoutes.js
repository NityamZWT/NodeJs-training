const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController')

const authentication = require('../middlewares/authentication');


router.get('/profile',authentication('admin','customer'),userControllers.getProfile);
router.put('/profile',authentication('admin','customer'),userControllers.updateProfile);
router.get('/',authentication('admin'),userControllers.getAllProfile);




module.exports = router