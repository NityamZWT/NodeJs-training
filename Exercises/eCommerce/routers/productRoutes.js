const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const {fileUploadFilter} = require('../middlewares/imageMiddleware')
const idMiddleware = require('../middlewares/idMiddleware')


router.post('/', authentication('admin'),fileUploadFilter, productControllers.createProduct);
router.get('/', productControllers.getProduct);
router.get('/:id',idMiddleware, productControllers.getProductById);
router.put('/:id',idMiddleware, authentication('admin'),fileUploadFilter,productControllers.updateProduct);
router.delete('/:id',idMiddleware, authentication('admin'),productControllers.deleteProduct)


module.exports = router