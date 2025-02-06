const { Category } = require('../models');
const {responseHandler, handleYupError, handleDatabaseError} = require('../utilities/customHandler')
const {categorySchema} = require('../validators/categoryValidator')
const yup = require('yup');

//handling category creation by admin
const createCategory = async (req, res, next) => {
    try {
        await categorySchema.validate(req.body, { abortEarly: false });

        const categoryName = req.body.name;

        const newCategory = await Category.create({ name: categoryName });

        return responseHandler(res, 201, true, `category ${newCategory.name} is created with ${newCategory.id}`,[newCategory]);

    } catch (error) {
        //handle yup error 
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        //handle unique contraint error of database 
        if (error instanceof UniqueConstraintError) {
            return handleDatabaseError(error, res);
        }
        next(error);
    }
}

//handling access or getting of category
const getCategory = async (req, res, next) => {
    try {
        const categoryData = await Category.findAll();
        if (categoryData === null) {
            return responseHandler(res, 400, false, 'categories are not found!')
        }

        return responseHandler(res, 200, true, 'All categories are fetched successfully', categoryData)
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createCategory,
    getCategory
}