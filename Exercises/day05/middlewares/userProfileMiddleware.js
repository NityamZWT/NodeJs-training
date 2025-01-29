const { profileId } = require('../validators/uservalidator');
const db = require('../config/config')

async function userProfileMiddleware(req, res, next) {

    const id = parseInt(req.params.id)
  
    console.log('id',id);

    const { error } = profileId.validate({ id });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const query = `SELECT EXISTS(SELECT 1 FROM user_profiles WHERE user_profiles.id = ?)AS user_exists`;
    const values = [id];
    const profile = await db.query(query,values);
    console.log("user",profile[0]);
    
    
    if (profile[0].user_exists===0) {
        return res.status(404).json({ message: "user profile not exists!" });
    }
    next();
}

module.exports = userProfileMiddleware;