const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')


router.post('/', authentication('customer'), cartControllers.createCart);
router.get('/', authentication('customer'),cartControllers.getcart);
router.delete('/:id', authentication('customer'),cartControllers.deleteCart);



module.exports = router