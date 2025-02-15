const jwt = require('jsonwebtoken')
require('dotenv').config()

const privatekey = process.env.JWT_PRIVATE_KEY;

const generateToken = (id, email, password)=>{
    const token = jwt.sign({id, email, password},privatekey, { expiresIn:'1h' })
    console.log('token--',token);
    return token;
}

module.exports = {generateToken};