const express = require('express');
const router = express.Router();
const wishlistControllers = require('../controllers/wishlistController')
const authentication = require('../middlewares/authentication')
const idMiddleware = require('../middlewares/idMiddleware')

//handling wishlist routes

//create wishlist
router.post('/', authentication('customer'), wishlistControllers.createwishlist);
// get wishlist
router.get('/', authentication('customer'),wishlistControllers.getwishlist);
//delete wishlist
router.delete('/:id', idMiddleware,  authentication('customer'),wishlistControllers.deletewishlist);



module.exports = router