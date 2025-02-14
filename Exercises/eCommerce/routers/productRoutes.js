const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const {fileUploadFilter} = require('../middlewares/imageMiddleware')
const idMiddleware = require('../middlewares/idMiddleware')

//handling products routes

//create product
router.post('/', authentication('admin'),fileUploadFilter, productControllers.createProduct);
//get product
router.get('/', productControllers.getProduct);
//get specific product
router.get('/:id',idMiddleware, productControllers.getProductById);
//update product
router.patch('/:id',idMiddleware, authentication('admin'), fileUploadFilter, productControllers.updateProduct);
//delete product 
router.delete('/:id',idMiddleware, authentication('admin'),productControllers.deleteProduct)


module.exports = router