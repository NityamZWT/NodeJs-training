const {responseHandler, handleYupError} = require('../utilities/customHandler')
const { User } = require('../models');
const { profileUpdateSchema } = require('../validators/profileValidator')
const {userQuerySchema} = require('../validators/userValidator')
const yup = require('yup');

//handling getting of profile 
const getProfile = async (req, res, next) => {
    try {
        const userId = parseInt(req.user.id);
        console.log("typeof--", typeof userId);

        const resp = await User.findByPk(userId,{
            attributes:{exclude: ["password"]}
        });
        if (resp === null) {
            return responseHandler(res, 400, false, "user not found!")
        }
        return responseHandler(res, 200, true, `Profile of ${resp.first_name} is fetched successfully`, [resp])
    } catch (error) {
        next(error)
    }
}

//handling updation of profile 
const updateProfile = async (req, res, next) => {
    try {
        await profileUpdateSchema.validate(req.body, { abortEarly: false });

        const { first_name, last_name, email } = req.body

        const userId = parseInt(req.user.id)
        const updateData = {
            ...(first_name && { first_name }),
            ...(last_name && { last_name }),
            ...(email && { email }),
        }
        //check if body doesn't contain anything
        if (Object.keys(updateData).length === 0) {
            return responseHandler(res, 400, false, 'please provide fileds that you want to update!')
        }

        await User.update(updateData, { where: { id: userId } })
        const updatedUserData = await User.findByPk(userId,{
            attributes:{exclude: ["password"]}
        })
        return responseHandler(res, 200, true, 'user update successfully!', [updatedUserData]);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

//handling getting of all profile by admin
const getAllProfile = async (req, res, next) => {
    try {
        await userQuerySchema.validate(req.body, { abortEarly: false });

        const { role, orderby, ordertype } = req.query;
        const filter = role ? { role } : {};
        const orderList = orderby?[[orderby, ordertype]]:undefined

        const userData = await User.findAll({
            where: filter,
            order: orderList,
            attributes:{exclude: ["password"]}
        });
        if (userData.length === 0) {
            return responseHandler(res, 400, false, "can't get all users!");
        }
        return responseHandler(res, 200, true, 'All users fetched successfully!', userData);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

module.exports = {
    getProfile,
    updateProfile,
    getAllProfile
}