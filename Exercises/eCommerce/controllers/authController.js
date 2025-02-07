const { User } = require('../models');
const bcrypt = require('bcrypt');
const {responseHandler, handleYupError, handleDatabaseError} = require('../utilities/customHandler')
const { generateToken } = require('../utilities/jwtTokenGenerator');
const {registrationSchema, loginSchema} = require('../validators/authValidator')
const yup = require('yup');

//handling registration
const registration = async(req, res, next)=>{
try {
    await registrationSchema.validate(req.body, { abortEarly: false });
    const {email} = req.body;
    const emailCheck = await User.findOne({where:{email}});

    //check if email alrady exist or not in database
    if(emailCheck)return responseHandler(res, 400, false, "User with this email already exists!")
        
    //if create method fails
    const newRegisteredUser = await User.create(req.body);
    if(newRegisteredUser===null)return responseHandler(res, 500, true,"registration failed due to server error! Please try again.");

    return responseHandler(res, 201, true, "user registed Successfully!");
} catch (error) {
      //handle unique contraint error of database 
      if (error instanceof UniqueConstraintError) {
        return handleDatabaseError(error, res);
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
        const userLogin = await User.findOne({ where: { email: email }})

        if (userLogin === null) { 
            return responseHandler(res, 404, false, 'user not found!') 
        }
        
        //handling password verification
         const verify = bcrypt.compareSync(password, userLogin.password);
         if (verify) {
            console.log('verify--', verify);

            const Token = generateToken(userLogin.id, userLogin.role);

            return responseHandler(res, 200, true, `${userLogin.first_name} is successfully login as ${userLogin.role}`, Token);
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