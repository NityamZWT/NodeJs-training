const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const {fileUploadFilter} = require('../middlewares/imageMiddleware')


router.post('/', authentication('admin'),fileUploadFilter, productControllers.createProduct);
router.get('/', productControllers.getProduct);
router.get('/:id', productControllers.getProductById);
router.put('/:id',authentication('admin'),fileUploadFilter,productControllers.updateProduct);
router.delete('/:id',authentication('admin'),productControllers.deleteProduct)


module.exports = router