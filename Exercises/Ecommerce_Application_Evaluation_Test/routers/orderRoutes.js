const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController')
const authentication = require('../middlewares/authentication')


router.post('/', authentication('customer'), orderControllers.createOrder);
// router.get('/', authentication('customer'),whishlistControllers.getWhishlist);
// router.delete('/:id', authentication('customer'),whishlistControllers.deleteWhishlist);



module.exports = router