const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController')
const authentication = require('../middlewares/authentication')
const idMiddleware = require('../middlewares/idMiddleware')

//handling order routes

//create order
router.post('/', authentication('customer'), orderControllers.createOrder);
// get order
router.get('/', authentication('customer'),orderControllers.getOrders);
//get specific order
router.get('/:id',idMiddleware, authentication('customer'),orderControllers.getOrderById);
//update order
router.put('/:id/status',idMiddleware, authentication('admin'),orderControllers.updateOrderStatus);


module.exports = router