const users = require('../const'); 
const  uploadImage  = require('../controllers/userController');


const getUsers = () => {
    return users;
}

const getUserById = (id) => {
    return users.find(user => user.id === parseInt(id));
}

const addUser = (newUser) => {
    users.push(newUser);
}

const updateUser = (id, updatedData) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        return users[userIndex];
    }
    return null;
}

const deleteUser = (id) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex !== -1) {
        return users.splice(userIndex, 1);
    }
    return null;
}

const uploadImageModel = (id, files) =>{
    console.log("enter in the model");
    
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    console.log('index',userIndex);
    
    if (userIndex !== -1) {
        console.log('files',files);
        
        users[userIndex] = { ...users[userIndex], file: {name:files.originalname,path: files.path  }}
        return users[userIndex];
    }
    throw new Error('something wrong in handling file')
}

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, uploadImageModel };
