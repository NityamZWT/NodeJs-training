const users = require('../const');
const uploadImage = require('../controllers/userController');
const db = require('../config')


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
        throw error;
    }

}

const updateUser = async (id, updatedData) => {
 
        console.log('updatedData:---',updatedData);
        
        // const { name, email, age, role } = updatedData;
        const userId = parseInt(id);

        if(Object.keys(updatedData).length === 0){
            console.log('enter in condition:',Object.keys(updatedData).length);
            
            throw new Error('please add data field you want to update!');
        }

        let query = `UPDATE users SET `

        for (const [key, value] of Object.entries(updatedData)) {
            console.log(`${key}: ${value}`);
            query = query + `${key} = "${value}", `; 
          }
            console.log(query);
            query = query.slice(0,-1);
            query = query + `where users.id = ${userId} `
            console.log(query);
            
    //     // const values = [name, email, age, role, userId]
        const result = await db.query(query);
        return result[0];
   
}

const deleteUser = async(id) => {
    try {
        const userIndex = parseInt(id);
        const query = `DELETE FROM users WHERE users.id = ?`
        const values = [userIndex];
        const result = await db.query(query,values);
        return result[0];
    } catch (error) {
        return null;
    }
    // const userIndex = users.findIndex(user => user.id === parseInt(id));
  
}

const uploadImageModel = (id, files) => {
    console.log("enter in the model");

    const userIndex = users.findIndex(user => user.id === parseInt(id));
    console.log('index', userIndex);

    if (userIndex !== -1) {
        console.log('files', files);

        users[userIndex] = { ...users[userIndex], file: { name: files.originalname, path: files.path } }
        return users[userIndex];
    }
    throw new Error('something wrong in handling file')
}

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, uploadImageModel };
