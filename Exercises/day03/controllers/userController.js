const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
    try {
        console.log('enter');
        
        const users = userModel.getUsers();
        console.log(users);
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
}

const getUserById = (req, res) => {
    const user = userModel.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
}

const createUser = (req, res) => {
    const { id, name, email, age, role, isActive } = req.body;
    const newUser = { id, name, email, age, role, isActive };
    userModel.addUser(newUser);
    res.status(201).json(newUser);
}

const updateUser = (req, res) => {
    const updatedUser = userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(updatedUser);
}

const deleteUser = (req, res) => {
    const deletedUser = userModel.deleteUser(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
}

module.exports = { 
    getAllUsers,
    getUserById, 
    createUser,
    updateUser, 
    deleteUser 
};
