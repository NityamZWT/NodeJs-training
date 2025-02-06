const express = require('express');
const router = express.Router();
const wishlistControllers = require('../controllers/wishlistController')
const authentication = require('../middlewares/authentication')
const idMiddleware = require('../middlewares/idMiddleware')


router.post('/', authentication('customer'), wishlistControllers.createwishlist);
router.get('/', authentication('customer'),wishlistControllers.getwishlist);
router.delete('/:id', idMiddleware,  authentication('customer'),wishlistControllers.deletewishlist);



module.exports = router