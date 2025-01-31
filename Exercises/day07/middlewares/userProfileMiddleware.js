const { profileId } = require('../validators/uservalidator');
// const db = require('../config/db')
const User = require('../models/Users')
const User_Profile = require('../models/Profiles')
async function id_userProfileMiddleware(req, res, next) {
    const id = parseInt(req.params.id);
    console.log('Id',id);
    
    const { error } = profileId.validate({id});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const profile = await User_Profile.findByPk(id)
    console.log("user",profile);
    
    
    if (profile === null) {
        return res.status(404).json({ message: "User Profile is not found!" });
    }
    next();
}

async function userId_userProfileMiddleware(req, res, next) {
    const userId = parseInt(req.body.userId);
    console.log('userId',userId);
    
    if(isNaN(userId))return res.status(400).json({message: 'userId not Found!'})
    const { error } = profileId.validate({userId});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const profile = await User_Profile.findOne({where: {userId: userId}});
    console.log("user",profile);
    
    
    if(profile !== null) {
        return res.status(404).json({ message: "User Profile already exists!" });
    }
    next();
}

module.exports = {id_userProfileMiddleware, userId_userProfileMiddleware}