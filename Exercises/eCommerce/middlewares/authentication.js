const jwt = require('jsonwebtoken');
require('dotenv').config();
const responseHandler = require('../utilities/responseHandler');


const privatekey = process.env.JWT_PRIVATE_KEY;

const authentication = (...Role)=>{
    return (req, res, next)=>{
        try {
            const token = req.headers.authorization;
            if(!token){
                return responseHandler(res, 401, false, 'token not found! please login first')
            }
        const jwtToken = token.split(' ')[1];
        jwt.verify(jwtToken, privatekey,(err, decoded)=>{
                    if(err){
                        responseHandler(res, 401, false, "User is not Authorized!")
                    }
                    if(!Role.includes(decoded.role)) {
                        return responseHandler(res, 401, false, `you can't have access as ${decoded.role}` );
                    }
                    console.log("decoded--",decoded);
                    
                    req.user = decoded;

                    console.log("req.user--",req.user);

                    next()
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authentication;