const users = require('../const'); 


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

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser };
