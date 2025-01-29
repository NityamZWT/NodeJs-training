const { userIdSchema } = require('../validators/uservalidator');
const db = require('../config/config')

async function idValidatorMiddleware(req, res, next) {
    const Id = parseInt(req.params.id);
    const { error } = userIdSchema.validate({ id: Id});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const query = `select 1 from users where users.id =?`;
    const values = [Id];
    const user = await db.query(query,values);
    console.log("user",user[0]);
    
    
    // const user = users.find((user) => user.id === userId);
    if (user[0].length===0) {
        return res.status(404).json({ message: "User not found!!!" });
    }
    next();
}

module.exports = idValidatorMiddleware;
