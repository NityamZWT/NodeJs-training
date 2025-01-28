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

        const [userEntry] = await db.query(query, values);
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
    const result = await db.query(query);
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
        return null;
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

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, uploadImageModel };
