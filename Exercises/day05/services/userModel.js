const db = require('../config/config')
const Path = require('node:path');

// sql and database logic for getting all users from usersdb
const getUsers = async () => {
    try {
        const query = `SELECT * FROM users`
        const result = await db.query(query)
        return result[0];
    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for getting specific users from usersdb, user-imagesdb and user-profilesdb
const getUserById = async (id) => {
    try {
        console.log('get in service');
        const userId = parseInt(id);
        console.log('userId--', userId);

        const query = `SELECT 
        users.id AS user_Id,
        users.email AS user_email,
        users.age AS user_age,
        users.role AS user_role,
        users.isActive AS user_isActive,
        user_images.id AS image_Id,
        user_images.imageName AS image_name,
        user_images.path AS image_path,
        user_images.mimetype AS image_type,
        user_images.extension AS image_extention,
        user_images.size AS image_size,
        user_profiles.id AS profile_Id,
        user_profiles.bio AS profile_bio,
        user_profiles.linkedInUrl AS profile_linkedInUrl,
        user_profiles.facebookUrl AS profile_facebookUrl,
        user_profiles.instaUrl AS profile_instaUrl
    FROM users 
    JOIN user_images ON users.id = user_images.userId 
    JOIN user_profiles ON users.id = user_profiles.userId
    WHERE users.id = ?;`;

        const values = [userId];
        const result = await db.query(query, values);

        return result[0];
    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for ceating users in usersdb
const addUser = async (newUser) => {
    const { name, email, age, role, isActive } = newUser;
    try {
        const query = `
        INSERT INTO users (name, email, age, role, isActive)
        VALUES (?, ?, ?, ?, ?)`;

        const values = [name, email, age, role, isActive]
        const userEntry = await db.query(query, values);

        return userEntry[0];

    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for updating specific users from usersdb
const updateUser = async (id, updatedData) => {

    try {
        const userId = parseInt(id);

        //checking if updatedData object is not empty
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

        query = query + `where users.id = ?`
        params.push(userId);
        console.log(query);
        const result = await db.query(query, params);
        return result[0];
    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for deleting specific users from usersdb
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

//--------------------------------------------------------user Images model

// sql and database logic for uploading image in user_imagesdb
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

// sql and database logic for deleting images of specifc user from user_imagesdb
const deleteImage = async (userId) => {
    try {
        const Id = parseInt(userId);
        const query = `DELETE FROM user_images WHERE userId = ?`;
        const values = [Id];
        const result = await db.query(query, values);
        return result[0];
    } catch (error) {
        throw new Error('something went wrong while deleting image!')
    }

}


//---------------------------------------------------------user Profile models

// sql and database logic for creating new profile in user_profiledb
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

// sql and database logic for getting profile from user_profiledb
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

// sql and database logic for updating specific profile in user_profiledb
const updateUserProfile = async (id, updatedData) => {
    try {
        const Id = parseInt(id);

        //checking if updatedData object is not empty
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

// sql and database logic for deleting specific profile from user_profiledb
const deleteUserProfile = async (id) => {
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


module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    uploadImageModel,
    addUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    deleteImage
};
