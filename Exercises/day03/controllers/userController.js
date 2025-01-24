const userModel = require('../services/userModel');
const { createUserSchema, updateUserSchema } = require('../validators/uservalidator')

const response ={}

const getAllUsers = (req, res) => {
    try {
        console.log('enter');
        const{role, isActive, age} = req.query;

        const users = userModel.getUsers();
        filteredUsers = users;
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        if (isActive !== undefined) {
            const isActiveBool = isActive === 'true' || 'True' || 'TRUE'; 
            filteredUsers = filteredUsers.filter(user => user.isActive === isActiveBool);
        }
        if (age) {
            const age = parseInt(age);
            if (!isNaN(age)) {
                filteredUsers = filteredUsers.filter(user => user.age > age);
            }
        }
        console.log(filteredUsers);
        response.message = 'request handled successfully!';
        response.data = filteredUsers;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
}

const getUserById = (req, res) => {
    const user = userModel.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    response.message = 'request handled successfully'
    response.data = user
    res.status(200).json(response);
}

let count = 2;
const createUser = (req, res) => {
    count++;
    const { error } = createUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, age, role, isActive } = req.body;
    const newUser = { id: count, name, email, age, role, isActive };
    userModel.addUser(newUser);
    response.message = 'request handled successfully'
    response.data = newUser
    res.status(201).json(response);
}

const updateUser = (req, res) => {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const updatedUser = userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    response.message = 'request handled successfully'
    response.data = updateUser
    res.status(200).json(response);
}

const deleteUser = (req, res) => {
    const deletedUser = userModel.deleteUser(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: "User not found!" });
    }
    response.message = "User deleted successfully!"
    res.status(200).json(response);
}

module.exports = { 
    getAllUsers,
    getUserById, 
    createUser,
    updateUser, 
    deleteUser 
};
