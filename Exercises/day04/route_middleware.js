const users = require('./const')

function IdValidator(req, res, next) {
    console.log("soecific");
    
    const userId = parseInt(req.params.id);
    if (userId === undefined) { return res.status(400).json({ message: "please add id as params" }) }
    console.log("userId--",userId);
    
    const user = users.find((user) => user.id === userId);
    if (!user) { 
        return res.status(404).json({ message: "User not found!" });
    }
    next();
}

module.exports = IdValidator;