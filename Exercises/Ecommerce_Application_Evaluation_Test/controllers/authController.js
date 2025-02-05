const { User } = require('../models');
const bcrypt = require('bcrypt');
const responseHandler = require('../utilities/responseHandler')
const { generateToken } = require('../utilities/jwtTokenGenerator');
const {registrationSchema, loginSchema} = require('../validators/authValidator')
const yup = require('yup');



const registration = async(req, res, next)=>{
try {
    await registrationSchema.validate(req.body, { abortEarly: false });

    const resp = await User.create(req.body);
    if(resp===null)return responseHandler(res, 400, true,"registration failed!");

    return responseHandler(res, 201, true,"registration Successfull!");
} catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0].path; 
        return responseHandler(res, 400, false, `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`)
    }

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

module.exports={
    registration,
    login
}