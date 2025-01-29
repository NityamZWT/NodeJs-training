const { profileId } = require('../validators/uservalidator');
const db = require('../config/config')

async function id_userProfileMiddleware(req, res, next) {
    const id = parseInt(req.params.id);
    console.log('Id',id);
    
    // if(isNaN(userId))return res.status(400).json({message: 'userId not Found!'})
    const { error } = profileId.validate({id});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const query = `select 1 from user_profiles where user_profiles.id =?`;
    const values = [id];
    const profile = await db.query(query,values);
    console.log("user",profile[0]);
    
    
    if (profile[0].length===0) {
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
    const query = `select 1 from user_profiles where user_profiles.userId =?`;
    const values = [userId];
    const profile = await db.query(query,values);
    console.log("user",profile[0]);
    
    
    if(profile[0].length!=0) {
        return res.status(404).json({ message: "User Profile already exists!" });
    }
    next();
}

module.exports = {id_userProfileMiddleware, userId_userProfileMiddleware}