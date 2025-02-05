const express = require('express');
const router = express.Router();
const whishlistControllers = require('../controllers/whishlistController')
const authentication = require('../middlewares/authentication')


router.post('/', authentication('customer'), whishlistControllers.createWhishlist);
router.get('/', authentication('customer'),whishlistControllers.getWhishlist);
router.delete('/:id', authentication('customer'),whishlistControllers.deleteWhishlist);



module.exports = router