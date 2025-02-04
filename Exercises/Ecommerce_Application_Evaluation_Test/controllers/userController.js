const responseHandler = require('../utilities/responseHandler')
const { User } = require('../models');
const{profileUpdateSchema} = require('../validators/profileValidator')

const getProfile = async(req, res, next)=>{
    try {
        const userId = req.user.id;
        console.log("typeof--", typeof userId);
        
        const resp = await User.findByPk(userId);
        if(resp===null){
            return responseHandler(res, 400, false, "can't access your profile!")
        }
        return responseHandler(res, 200, true, `Profile of ${resp.first_name} is fetched successfully`,{resp})
    } catch (error) {
        next(error)
    }
}

const updateProfile = async(req, res, next)=>{
    try {
        await profileUpdateSchema.validate(req.body, { abortEarly: false });

        const userId = req.user.id
        if (Object.keys(req.body).length === 0) {
            console.log('enter in condition:', Object.keys(req.body).length);
            // console.log("before");
            
            return responseHandler(res, 204, false, "please provide field that you want to update!")
            // console.log("after");
        }
        // const userId = parseInt(id);
        const resp = await User.update(req.body, { where: { id: userId } })
        console.log("result---", resp);
        return responseHandler(res, 200, true, 'user update successfully!');
    } catch (error) {
        if (error.name === 'ValidationError') {
            return responseHandler(res, 400, false, 'validation error',null, error.errors );
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