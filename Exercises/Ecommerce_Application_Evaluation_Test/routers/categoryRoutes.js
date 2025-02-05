const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController')
const authentication = require('../middlewares/authentication')


router.post('/', authentication('admin'), categoryControllers.createCategory);
router.get('/', categoryControllers.getCategory);



module.exports = router