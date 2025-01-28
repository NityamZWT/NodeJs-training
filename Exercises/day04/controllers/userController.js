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

        
        // if (role) {
        //     filteredUsers = filteredUsers.filter(user => user.role === role);
        // }
        // if (isActive !== undefined) {
        //     const isActiveBool = isActive === 'true' || 'True' || 'TRUE'; 
        //     filteredUsers = filteredUsers.filter(user => user.isActive === isActiveBool);
        // }
        // console.log(typeof(age));
        
        // if (age) {
        //     console.log('age',age);
            
        //     console.log('age type:---',typeof(age));
            
        //     const Age = parseInt(age);
        //     console.log(Age);
            
        //     if (!isNaN(Age)) {
        //         console.log('Age:--', Age);
                
        //         filteredUsers = filteredUsers.filter(user => user.age > Age);
        //     }
        // }
        // if(filteredUsers.length == 0){
        //     response.message = `No User present in which match${role==undefined?"":`role = ${req.query.role}`}, ${isActive==undefined?"":`isActive = ${req.query.isActive}`} ${age==undefined?"":`age = ${req.query.age}`}.`
        //     return res.json(response.message)
        // }else{
        // response.message = 'request handled successfully!';
        // response.data = users;
        // res.status(200).json(response);
        // }
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
}

const getUserById = async(req, res) => {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    response.message = 'request handled successfully'
    response.data = user
    res.status(200).json(response);
}

// let count = 2;
const createUser = async(req, res) => {
    // count++;
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
}

const updateUser = async(req, res) => {
    try{
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
    }catch(error){
        response.message =  error.message || "server error!"
        return res.status(error.code || 500).json(response)
    }
}

const deleteUser = async(req, res) => {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: "User not found!" + userId });
    }
    response.message = "User deleted successfully!"
    response.data = deletedUser
    res.status(200).json(response);
}

const uploadImage = (req, res) => {
    try{
        console.log("enter in controller");
        console.log('req.body', req.body);
        
        const files = req.file;
        console.log('files',files);
        const file = userModel.uploadImageModel(req.params.id, files);
        console.log('file',file.path);
        if(!req.params.id){
            return res.status(404).json({massage:"user not found with" + req.params.id})
        }
        response.message = "image added successfully!!";
        res.status(200).json(response)
    }catch(error){
        console.log('server error!:',error);
        response.message= error.message;
        return res.status(500).json(response.message)
    }
}

module.exports = { 
    getAllUsers,
    getUserById, 
    createUser,
    updateUser, 
    deleteUser,
    uploadImage 
};
