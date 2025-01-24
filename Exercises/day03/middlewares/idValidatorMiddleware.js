const users = require('../const'); 
const { userIdSchema } = require('../validators/uservalidator');

function idValidatorMiddleware(req, res, next) {
    const userId = parseInt(req.params.id);
    const { error } = userIdSchema.validate({ id: userId});

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    next();
}

module.exports = idValidatorMiddleware;
