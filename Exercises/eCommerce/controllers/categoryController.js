const { Model } = require('sequelize');
const { Category, Product } = require('../models');
const {responseHandler, handleYupError, handleDatabaseError} = require('../utilities/customHandler')
const {categorySchema} = require('../validators/categoryValidator')
const yup = require('yup');

//handling category creation by admin
const createCategory = async (req, res, next) => {
    try {
        await categorySchema.validate(req.body, { abortEarly: false });

        const categoryName = req.body.name;
        //check category if exist or not in database
        const categoryNameCheck = await Category.findOne({where:{name:categoryName}})
        if(categoryNameCheck)return responseHandler(res, 400, false, "Category already exists!")
            
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
        const {categoryname} = req.query;
        const limitNumber = req.query.limit ? parseInt(req.query.limit) : 100;


        const categoryFilter = {
            ...(categoryname && { name: categoryname })
        }
        const categoryData = await Category.findAll({
            limit:limitNumber,
            where: categoryFilter,
            include:{
                model: Product,
                required: false,
                as:'products'
            }
        });
        if (categoryData.length === 0) {
            return responseHandler(res, 404, false, 'categories are not found!')
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