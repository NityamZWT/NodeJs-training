const jwt = require('jsonwebtoken');
require('dotenv').config();

const privatekey = process.env.JWT_PRIVATE_KEY;

const Authentication = (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        // console.log('token--',token);
        
        const jwtToken = token.split(' ')[1];
        // console.log('jwttoken--',jwtToken);
        jwt.verify(jwtToken, privatekey,(err, decoded)=>{
            if(err){
                res.status(400).json({message:'user is not authorized!'})
            }
            // console.log('verifysss---',decoded.id);
            
            next()
        })
        
    } catch (error) {
        res.status(500).json({message:"something went wrong in authentication"})
    }
}

module.exports = Authentication;