const responseHandler = require('../utilities/responseHandler')
const { User } = require('../models');
const{profileUpdateSchema} = require('../validators/profileValidator')
const yup = require('yup');


const getProfile = async(req, res, next)=>{
    try {
        const userId = parseInt(req.user.id);
        console.log("typeof--", typeof userId);
        
        const resp = await User.findByPk(userId);
        if(resp===null){
            return responseHandler(res, 400, false, "user not found!")
        }
        return responseHandler(res, 200, true, `Profile of ${resp.first_name} is fetched successfully`,[resp])
    } catch (error) {
        next(error)
    }
}

const updateProfile = async(req, res, next)=>{
    try {
            await profileUpdateSchema.validate(req.body, { abortEarly: false });

            const{first_name, last_name, email} = req.body

            const userId = parseInt(req.user.id)
        const updateData = {
            ...(first_name && {first_name}),
            ...(last_name && {last_name}),
            ...(email && { email }),
        }
            console.log("updatedData==",updateData);
            
        if(Object.keys(updateData).length === 0){
            console.log('updateData--',updateData);  
            return responseHandler(res, 204, false, 'please provide fileds that you want to update!')
        }

        const resp = await User.update(updateData,{where: {id: userId}})
            return responseHandler(res, 200, true, 'user update successfully!');
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

        next(error)
    }
}

const getAllProfile = async(req, res, next)=>{
    try {
        const resp = await User.findAll();
        if(resp===null){
            return responseHandler(res, 400, false, "can't get all users!");
        }
        return responseHandler(res, 200, true, 'All users fetched successfully!',resp);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProfile,
    updateProfile,
    getAllProfile
}