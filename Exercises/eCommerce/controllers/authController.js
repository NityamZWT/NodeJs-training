const { User } = require('../models');
const bcrypt = require('bcrypt');
const {responseHandler, handleYupError} = require('../utilities/responseHandler')
const { generateToken } = require('../utilities/jwtTokenGenerator');
const {registrationSchema, loginSchema} = require('../validators/authValidator')
const yup = require('yup');

//handling registration
const registration = async(req, res, next)=>{
try {
    await registrationSchema.validate(req.body, { abortEarly: false });

    const newRegisteredUser = await User.create(req.body);

    //if create method fails
    if(newRegisteredUser===null)return responseHandler(res, 400, true,"registration failed!");

    return responseHandler(res, 201, true, "registration Successfull!", [newRegisteredUser]);
} catch (error) {
    //handling unique contraint error of database
    if (error.name === 'SequelizeUniqueConstraintError') {
        const field = error.errors[0].path; 
        return responseHandler(res, 400, false, `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`)
    }

    //handling yup error manually
    if (error instanceof yup.ValidationError) {
        return handleYupError(error, res);
    }
    next(error)
}
}

//handling login of users
const login = async(req, res, next)=>{
    try {
    await loginSchema.validate(req.body, { abortEarly: false });
        
        const {email, password} = req.body;
        //check if user already exist or not
        const userLogin = await User.findOne({ where: { email: email } })

        if (userLogin === null) { 
            return responseHandler(res, 401, false, 'user not found!') 
        }
        //handling password verification
         const verify = bcrypt.compareSync(password, userLogin.password);
         if (verify) {
            console.log('verify--', verify);

            const Token = generateToken(userLogin.id, userLogin.role);

            return responseHandler(res, 200, true, `${userLogin.first_name} is successfully login as ${userLogin.role}`,{userLogin, Token});
        }
        else {
            responseHandler(res, 401, false, "password is Incorrect! Please provide correct password to login.")
        }

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
    next(error)
    }
}

module.exports={
    registration,
    login
}