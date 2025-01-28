const { string } = require('joi');
const userModel = require('../services/userModel');
const { createUserSchema, updateUserSchema, querySchema } = require('../validators/uservalidator')

const response ={}

const getAllUsers = async(req, res) => { 
    try {
        const { error } = querySchema.validate(req.query);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        console.log('enter');
        const{role, isActive, age} = req.query;
        // console.log(req.query);
        // console.log(req.query.age);
        
        
        const users = await userModel.getUsers();
        response.message = 'request handled successfully'
        response.data = users;
        console.log(response);
        
        res.status(200).json(response);

    } catch (error) {
        return res.status(error.code||500).json({message: error['message']||'server error!'})

    }
}

const getUserById = async(req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        response.message = 'request handled successfully'
        response.data = user
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code||500).json({message: error['message']||'server error!'})

    }
}


const createUser = async(req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
    
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { name, email, age, role, isActive } = req.body;
        const newUser = { name, email, age, role, isActive };
        const userAdded = await userModel.addUser(newUser);
        console.log(userAdded);
        
        response.message = 'request handled successfully'
        response.data = userAdded;
        console.log(response);
        
        res.status(201).json(response);
    } catch (error) {
        return res.status(error.code||500).json({message: error['message']||'server error!'})

    }
}

const updateUser = async(req, res) => {
    try {
        const { error } = updateUserSchema.validate(req.body);
    
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        response.message = 'request handled successfully'
        response.data = updateUser
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code||500).json({message: error['message']||'server error!'})
    }
}

const deleteUser = (req, res) => {
    try {
        const deletedUser = userModel.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" + userId });
        }
        response.message = "User deleted successfully!"
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code||500).json({message: error['message']||'server error!'})
    }
}



module.exports = { 
    getAllUsers,
    getUserById, 
    createUser,
    updateUser, 
    deleteUser
};
