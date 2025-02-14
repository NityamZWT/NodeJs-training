const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const idMiddleware = require('../middlewares/idMiddleware')

//handling cart routes

// cart creation
router.post('/', authentication('customer'), cartControllers.createCart);
//get cart
router.get('/', authentication('customer'),cartControllers.getcart);
//delete cart
router.delete('/:id',idMiddleware, authentication('customer'),cartControllers.deleteCart);
//increment and decrement update
router.put('/:id', idMiddleware, authentication('customer'), cartControllers.updateCartQuantity)



module.exports = router