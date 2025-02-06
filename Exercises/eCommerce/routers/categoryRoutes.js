const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController')
const authentication = require('../middlewares/authentication')


//handling category routes

//create category
router.post('/', authentication('admin'), categoryControllers.createCategory);
//get category
router.get('/', categoryControllers.getCategory);



module.exports = router