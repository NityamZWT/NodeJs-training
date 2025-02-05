const { Category } = require('../models');
const responseHandler = require('../utilities/responseHandler');
const {categorySchema} = require('../validators/categoryValidator')
const yup = require('yup');
const {SequelizeValidationError, UniqueConstraintError} = require('sequelize')



const createCategory = async (req, res, next) => {
    try {
        await categorySchema.validate(req.body, { abortEarly: false });

        const categoryName = req.body.name;

        const resp = await Category.create({ name: categoryName });

        return responseHandler(res, 201, true, `category ${resp.name} is created with ${resp.id}`);

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("formatted--", error.inner);
        
            const formattedErrors = error.inner.map(err => ({
                message: err.message
            }));
        
            const responseMessage = formattedErrors.map((i)=>{
                console.log(i.message);
                
                return i.message
            })
            return responseHandler(res, 400, false, responseMessage, null, formattedErrors);
        }

        if (error instanceof UniqueConstraintError || error instanceof SequelizeValidationError) {
            const formattedErrors = error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            }));
            return responseHandler(res, 400, false, 'database validation error', null, formattedErrors)
        }
        next(error);
    }
}

const getCategory = async (req, res, next) => {
    try {
        const resp = await Category.findAll();
        if (resp === null) {
            return responseHandler(res, 400, false, 'categories are not found!')
        }

        return responseHandler(res, 200, true, 'All categories are fetched successfully', resp)
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof SequelizeValidationError) {
            const formattedErrors = error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            }));
            return responseHandler(res, 400, false, 'database validation error', null, formattedErrors)
        }
        next(error);
    }
}


module.exports = {
    createCategory,
    getCategory
}