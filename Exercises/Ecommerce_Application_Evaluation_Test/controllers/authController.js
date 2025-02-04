const { User } = require('../models');
const bcrypt = require('bcrypt');
const responseHandler = require('../utilities/responseHandler')
const { generateToken } = require('../utilities/jwtTokenGenerator');
const {registrationSchema, loginSchema} = require('../validators/authValidator')



const registration = async(req, res, next)=>{
try {
    await registrationSchema.validate(req.body, { abortEarly: false });

    const resp = await User.create(req.body);
    if(resp===null)return responseHandler(res, 400, true,"registration failed!");

    return responseHandler(res, 201, true,"registration Successfull!");
} catch (error) {
    if (error.name === 'ValidationError') {
        return responseHandler(res, 400, false, 'validation error',null, error.errors );
    }
    next(error)
}
}

const login = async(req, res, next)=>{
    try {
    await loginSchema.validate(req.body, { abortEarly: false });
        console.log('here----------');
        
        const {email, password} = req.body;
        const resp = await User.findOne({ where: { email: email } })

        if (resp === null) { 
            return responseHandler(res, 401, false, 'user not found!') 
        }
         const verify = bcrypt.compareSync(password, resp.password);
         if (verify) {
            console.log('verify--', verify);

            const Token = generateToken(resp.id, resp.role);

            return responseHandler(res, 200, true, `${resp.first_name} is successfully login as ${resp.role}`,{resp, Token});
        }
        else {
            responseHandler(res, 401, false, "password is Incorrect! Please provide correct password to login.")
        }

    } catch (error) {
        if (error.name === 'ValidationError') {
            return responseHandler(res, 400, false, 'validation error',null, error.errors );
        }
    next(error)
    }
}

module.exports={
    registration,
    login
}