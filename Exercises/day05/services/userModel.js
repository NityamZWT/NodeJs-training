const users = require('../const');
const uploadImage = require('../controllers/userController');
const db = require('../config/config')
const Path = require('node:path');

const getUsers = async () => {
    try {
        const query = `SELECT * FROM users`
        const result = await db.query(query)
        // console.log('result--', result);
        return result[0];
    } catch (error) {
        throw new error;
    }
}

const getUserById = async (id) => {
    try {
        const userId = parseInt(id);
        const query = `select * from users where users.id = ? `
        const values = [userId];
        const result = await db.query(query, values);
        return result[0];
    } catch (error) {
        throw new error;
    }
}

const addUser = async (newUser) => {
    const { name, email, age, role, isActive } = newUser;
    try {
        const query = `
        INSERT INTO users (name, email, age, role, isActive)
        VALUES (?, ?, ?, ?, ?)`;

        const values = [name, email, age, role, isActive]

        const userEntry = await db.query(query, values);
        console.log("insertId", userEntry.insertId);
        return userEntry[0];

    } catch (error) {
        throw new error;
    }
}

const updateUser = async (id, updatedData) => {
    console.log('updatedData:---', updatedData);

    // const { name, email, age, role } = updatedData;
    const userId = parseInt(id);

    if (Object.keys(updatedData).length === 0) {
        console.log('enter in condition:', Object.keys(updatedData).length);

        throw new Error('please add data field you want to update!');
    }

    let query = `UPDATE users SET `
    const params = [];
    const keys = Object.keys(updatedData);
    keys.forEach((key, index) => {
        query += `${key} = ?`;
        params.push(updatedData[key]);

        if (index < keys.length - 1) {
            query += ', ';
        }
    });
    console.log(query);
    // query = query.slice(0, -1);
    query = query + `where users.id = ?`
    params.push(userId);
    console.log(query);
    const result = await db.query(query,params);
    return result[0];

}

const deleteUser = async (id) => {
    try {
        const userIndex = parseInt(id);
        const query = `DELETE FROM users WHERE users.id = ?`
        const values = [userIndex];
        const result = await db.query(query, values);
        return result[0];
    } catch (error) {
        throw new Error('something went wrong while deleting user!')
    }
}

const uploadImageModel = async (id, files) => {
    try {
        console.log("enter in the model");
        const userId = parseInt(id);
        const extention = Path.extname(files.filename)
        const { filename, path, mimetype, size } = files;
        const query = `INSERT INTO user_images ( userId, imageName, path, mimeType, extension, size)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [userId, filename, path, mimetype, extention, size]
        const result = await db.query(query, values)
        console.log('index', userId);
        return result[0];
    } catch (error) {
        throw new Error('something wrong in handling file')
    }

}

const addUserProfile = async (newProfile) => {
    const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = newProfile;
    try {
        const query = `
        INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl)
        VALUES (?, ?, ?, ?, ?)`;

        const values = [userId, bio, linkedInUrl, facebookUrl, instaUrl]

        const result = await db.query(query, values);

        return result[0];
    }
    catch (error) {
        throw new Error('something went wrong while creating profile!')
    }
}

const getUserProfile = async (id) => {
    try {
        console.log('enter service');

        const Id = parseInt(id);
        console.log('userId', Id);
        const query = 
        `select user_profiles.*,
        users.name,
        users.email,
        users.age,
        users.role,
        users.isActive,
        users.createdAt AS usersCreatedAt,
        users.updatedAt AS usersUpdatedAt
        from user_profiles JOIN users ON users.id = user_profiles.userId WHERE user_profiles.id = ?`
        const values = [Id];
        const result = await db.query(query, values);
        console.log('result[0]--', result[0]);
        return result[0];
    } catch (error) {
        throw new Error('something went wrong while getting profile!')
    }
}

const updateUserProfile = async(id, updatedData)=>{
    try {
        const Id = parseInt(id);
        if (Object.keys(updatedData).length === 0) {
            console.log('enter in condition:', Object.keys(updatedData).length);
    
            throw new Error('please add data field you want to update!');
        }
    
        let query = `UPDATE user_profiles SET `
        const params = [];
        const keys = Object.keys(updatedData);
        keys.forEach((key, index) => {
            query += `${key} = ?`;
            params.push(updatedData[key]);
    
            if (index < keys.length - 1) {
                query += ', ';
            }
        });
        console.log(query);
        query = query + `where user_profiles.id = ?`
        params.push(Id);
        console.log(query);
        const result = await db.query(query, params);
        return result[0];

    } catch (error) {
        throw new Error('something went wrong while updating profile!')
    }
}

const deleteUserProfile = async(id)=>{
    try {
        const Id = parseInt(id);
        const query = `DELETE FROM user_profiles WHERE user_profiles.id = ?`;
        const values = [Id];
        const result = await db.query(query, values);
        return result[0];
    } catch (error) {
        throw new Error('something went wrong while deleting profile!')
    }
}

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, uploadImageModel, addUserProfile, getUserProfile, updateUserProfile, deleteUserProfile };
