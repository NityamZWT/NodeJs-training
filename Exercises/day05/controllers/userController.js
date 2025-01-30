const userModel = require('../services/userModel');
const { createUserSchema, updateUserSchema, querySchema, profileCreateSchema, profileUpdateSchema } = require('../validators/uservalidator')

//common response object
const response = {
    // message: null,
    // data: null
}

//controller for getting all users
const getAllUsers = async (req, res) => {
    try {
        //getUser - is service function that handle database logic
        const users = await userModel.getUsers();
        response.message = 'All users fetched successfully!'
        response.data = users;
        console.log(response);

        res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ message: error['message'] || 'server error!' })
    }
}

//controller for getting specific user by Id
const getUserById = async(req, res) => {
    try {
        //getUserId - is service function that handle database logic 
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        response.message = 'user details with ' + req.params.id +' fetch successfully';
        response.data = user;
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error['message'] || 'server error!' })
    }
}

//controller for creating new user
const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { name, email, age, role, isActive } = req.body;
        const newUser = { name, email, age, role, isActive };

         //addUser - is service function that handle database logic
        const userAdded = await userModel.addUser(newUser);
        console.log(userAdded);

        response.message = 'request handled successfully'

        res.status(201).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' })

    }
}

//controller for updating specific users by Id and updated values in body
const updateUser = async (req, res) => {
    try {
        const { error } = updateUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // updateUser - is service function that handle database logic
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        response.message = 'request handled successfully'

        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' })
    }
}

//controller for deleting specific users by Id
const deleteUser = async (req, res) => {
    try {
                //deleteUser - is service function that handle database logic
        const deletedUser = await userModel.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        response.message = "User deleted successfully!"
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' });
    }
}


//--------------------------------------------------- user Profile Controller

//controller for creating user profile 
const createUserProfile = async (req, res) => {
    try {
        const { error } = profileCreateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {userId, bio, linkedInUrl, facebookUrl, instaUrl} = req.body;
        const newProfile = {userId, bio, linkedInUrl, facebookUrl, instaUrl};
        
        //addUserProfile - is service function that handle database logic
        const profileAdded = await userModel.addUserProfile(newProfile);
        console.log(profileAdded);

        response.message = 'user profile created successfully';
        
        res.status(201).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' });
    }
}

//controller for getting user profile by Id
const getUserProfile = async(req, res)=>{
    try {
         //getUserProfile - is service function that handle database logic
        const userProfile = await userModel.getUserProfile(req.params.id);
        if(!userProfile) {
            return res.status(404).json({ message: "User not found!" });
        }

        // if(userProfile.length===0) {
        //     throw new Error('user profile not found!');
        // }

        response.message = 'user profile with user info is successfully handled'
        response.data = userProfile
        res.status(200).json(response);
    } 
    catch (error) {
        return res.status(500).json({ message: error['message'] || 'server error!' });
    }
}

//controller for updating user profile 
const updateUserProfile = async(req, res)=>{
    try {
        const { error } = profileUpdateSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

         //updateUserProfile - is service function that handle database logic
        const updatedUserProfile = await userModel.updateUserProfile(req.params.id, req.body);
        if (!updatedUserProfile) {
            return res.status(404).json({ message: "User not found!" });
        }
        response.message = 'User Profile Updated successfully!'
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' });
    }
}

//controller for deleting user profile
const deleteUserProfile = async(req, res)=>{
    try {
        //deleteUserProfile- is service function that handle database logic
        const deleteUserProfile = await userModel.deleteUserProfile(req.params.id);
        if (!deleteUserProfile) {
            return res.status(404).json({ message: "User not found!" });
        }

        response.message = "User profile deleted successfully!"
        res.status(200).json(response);
    } catch (error) {
        return res.status(error.code || 500).json({ message: error['message'] || 'server error!' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
