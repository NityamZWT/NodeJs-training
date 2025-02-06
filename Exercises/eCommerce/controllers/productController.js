const { Product, Category } = require('../models');
const { responseHandler, handleYupError } = require('../utilities/responseHandler')
const { productCreateSchema, productUpdateSchema, productQuerySchema } = require('../validators/productValidator')
const yup = require('yup');
const fs = require('fs')
const Path = require('path')
const { Op } = require('sequelize')

const createProduct = async (req, res, next) => {
    try {
        console.log(req.body);

        await productCreateSchema.validate(req.body, { abortEarly: false });

        const image_url = req.file ? req.file.path : null;

        const { name, description, price, stock, category_id } = req.body;

        const category_check = await Category.findByPk(category_id);

        if (category_check === null) return responseHandler(res, 400, false, 'category not exists!')

        const newProduct = {
            name,
            ...(description && { description }),
            price,
            stock,
            category_id,
            ...(image_url && { image_url })
        }

        const newProductData = await Product.create(newProduct);
        if (newProductData === null) {
            if (newProductData === null) return responseHandler(res, 400, true, "Product creation failed!");
        }
        return responseHandler(res, 201, true, "Product created Successfull!", [newProductData]);

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        await productQuerySchema.validate(req.body, { abortEarly: false });

        const { orderby, ordertype, maxprice, minprice, categoryname, productname } = req.query;
        const orderList = orderby ? [[orderby, ordertype]] : undefined;
        const productFilter = {
            ...(maxprice && { price: { [Op.lte]: parseFloat(maxprice) } }),
            ...(minprice && { price: { [Op.gte]: parseFloat(minprice) } }),
            ...(productname && { name: productname })
        }
        const categoryFilter = {
            ...(categoryname && { name: categoryname })
        }
        const productData = await Product.findAll({
            where: productFilter,
            order: orderList,
            include: {
                model: Category,
                require: false,
                as: "category",
                where: categoryFilter
            }
        })

        if (productData.length === 0) {
            return responseHandler(res, 400, false, "product not found!")
        }

        return responseHandler(res, 200, true, 'All products are fetched successfully', productData)
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}


const getProductById = async (req, res, next) => {
    try {
        const Id = parseInt(req.params.id)

        const productData = await Product.findByPk(Id, {
            include: {
                model: Category,
                require: false,
                as: "category"
            }
        });
        if (productData === null) {
            return responseHandler(res, 400, false, "product not found!")
        }

        return responseHandler(res, 200, true, `product with id: ${productData.id} are fetched successfully`, productData)

    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        await productUpdateSchema.validate(req.body, { abortEarly: false });

        const Id = parseInt(req.params.id)
        console.log(Id);
        productCheck = await Product.findByPk(Id);
        if (productCheck === null) {
            return responseHandler(res, 400, false, "product not found!")
        } else {
            if (req.file) {
                console.log('file--', req.file);

                const filePath = productCheck.image_url;
                const URL = Path.join(process.cwd(), 'public', Path.basename(filePath))

                fs.unlink(URL, (err) => {
                    console.log('inside unlink');

                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }
        }

        const image_url = req.file ? req.file.path : null;


        const { name, description, price, stock, category_id } = req.body

        const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price }),
            ...(stock && { stock }),
            ...(category_id && { category_id }),
            ...(image_url && { image_url })
        }
        console.log("updatedData==", updateData);

        if (Object.keys(updateData).length === 0) {
            console.log('updateData--', updateData);
            return responseHandler(res, 400, false, 'please provide fileds that you want to update!')
        }

        await Product.update(updateData, { where: { id: Id } })

        const updatedProductData = await Product.findByPk(Id)

        return responseHandler(res, 200, true, 'product update successfully!', [updatedProductData]);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const Id = parseInt(req.params.id);
        const productCheck = await Product.findByPk(Id);

        if (productCheck === null) {
            return responseHandler(res, 400, false, "product not found!")
        } else {
            const filePath = productCheck.image_url;
            const URL = Path.join(process.cwd(), 'public', Path.basename(filePath))

            fs.unlink(URL, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
            const resp = await Product.destroy({ where: { id: Id } })
            return responseHandler(res, 200, true, 'product deleted successfully!');
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}