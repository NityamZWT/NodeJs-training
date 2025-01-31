const { userIdSchema } = require('../validators/uservalidator');
// const db = require('../config/db')
const User = require('../models/Users')

async function idValidatorMiddleware(req, res, next) {
    const Id = parseInt(req.params.id);
    console.log('Id', Id);
    
    const { error } = userIdSchema.validate({ id: Id});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // const query = `select 1 from users where users.id =?`;
    // const values = [Id];
    // const user = await db.query(query,values);
    const user = await User.findByPk(Id)
    console.log("user",user);
    
    
    // check if user with requested id is present in database or not
    if (user===null) {
        console.log('check');
        
        return res.status(404).json({ message: "User not found!!!" });
    }
    next();
}

module.exports = idValidatorMiddleware;
