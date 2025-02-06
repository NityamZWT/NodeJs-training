const jwt = require('jsonwebtoken');
require('dotenv').config();
const {responseHandler} = require('../utilities/customHandler');


const privatekey = process.env.JWT_PRIVATE_KEY;

//role based authentication and jwrt token verification
const authentication = (...Role)=>{
    return (req, res, next)=>{
        try {
            const token = req.headers.authorization;
            if(!token){
                return responseHandler(res, 401, false, 'token not found! please login first')
            }
        const jwtToken = token.split(' ')[1];
        //verify token exist or not 
        jwt.verify(jwtToken, privatekey,(err, decoded)=>{
                    if(err){
                        responseHandler(res, 401, false, "User is not Authorized!")
                    }
                    //check if role has permission or not
                    if(!Role.includes(decoded.role)) {
                        return responseHandler(res, 401, false, `you can't have access as ${decoded.role}` );
                    }

                    req.user = decoded;
                    next()
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authentication;