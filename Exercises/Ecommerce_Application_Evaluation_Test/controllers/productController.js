const { Product, Category } = require('../models');
const responseHandler = require('../utilities/responseHandler');
const { productCreateSchema, productUpdateSchema } = require('../validators/productValidator')
const yup = require('yup');
const fs = require('fs')
const Path = require('path')
const { SequelizeValidationError, UniqueConstraintError } = require('sequelize')

const createProduct = async (req, res, next) => {
    try {
        console.log("enter");
        console.log(req.body);

        await productCreateSchema.validate(req.body, { abortEarly: false });

        const image_url = req.file ? req.file.path : null;

        const { name, description, price, stock, category_id } = req.body;
        console.log('2nd line');

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
        console.log('inside');

        const resp = await Product.create(newProduct);
        if (resp === null) {
            if (resp === null) return responseHandler(res, 400, true, "Product creation failed!");
        }
        return responseHandler(res, 201, true, "Product created Successfull!");

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("formatted--", error.inner);

            const formattedErrors = error.inner.map(err => ({
                message: err.message
            }));

            const responseMessage = formattedErrors.map((i) => {
                console.log(i.message);

                return i.message
            })
            return responseHandler(res, 400, false, responseMessage, null, formattedErrors);
        }


        if (error instanceof UniqueConstraintError) {
            const formattedErrors = error.errors.map((err) => ({
                message: err.message,
            }));
            return responseHandler(res, 400, false, "database validation error", null, formattedErrors)
        }

        next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const resp = await Product.findAll({
            include: {
                model: Category,
                require: false,
                as: "category"
            }
        })

        if (resp === null) {
            return responseHandler(res, 400, false, "product not found!")
        }

        return responseHandler(res, 200, true, 'All products are fetched successfully', resp)
    } catch (error) {
        next(error)
    }
}


const getProductById = async (req, res, next) => {
    try {
        const Id = parseInt(req.params.id)

        const resp = await Product.findByPk(Id, {
            include: {
                model: Category,
                require: false,
                as: "category"
            }
        });
        if (resp === null) {
            return responseHandler(res, 400, false, "product not found!")
        }

        return responseHandler(res, 200, true, `product with id: ${resp.id} are fetched successfully`, resp)

    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        console.log("files---", req.file);

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
            return responseHandler(res, 204, false, 'please provide fileds that you want to update!')
        }

        const resp = await Product.update(updateData, { where: { id: Id } })
        return responseHandler(res, 200, true, 'product update successfully!');
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("formatted--", error.inner);

            const formattedErrors = error.inner.map(err => ({
                message: err.message
            }));

            const responseMessage = formattedErrors.map((i) => {
                console.log(i.message);

                return i.message
            })
            return responseHandler(res, 400, false, responseMessage, null, formattedErrors);
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
                console.log('inside unlink');

                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
            const resp = await Product.destroy({where:{ id: Id}})
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