const users = require('../const'); 

function idValidatorMiddleware(req, res, next) {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Please provide a valid ID." });
    }
    
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    next();
}

module.exports = idValidatorMiddleware;
