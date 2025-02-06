const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController')
const authentication = require('../middlewares/authentication')
const idMiddleware = require('../middlewares/idMiddleware')


router.post('/', authentication('customer'), orderControllers.createOrder);
router.get('/', authentication('customer'),orderControllers.getOrders);
router.get('/:id',idMiddleware, authentication('customer'),orderControllers.getOrderById);
router.put('/:id/status',idMiddleware, authentication('admin'),orderControllers.updateOrderStatus);


module.exports = router