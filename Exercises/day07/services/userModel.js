// const db = require('../config/db')
const Path = require('node:path');
const User = require('../models/Users');
const { where } = require('sequelize');
const User_Image = require('../models/Images');
const User_Profile = require('../models/Profiles');
const { loginUser } = require('../controllers/userController');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utilities/jwtToken');
const { log } = require('node:console');

// sql and database logic for getting all users from usersdb
const getUsers = async (limit, page) => {
    const offset = (page-1) * limit;
    console.log('offset--',offset);
    
    try {
        const result = await User.findAll({
            limit,
            offset,
        });
        console.log('result--',result);
        
        return result;
    }
    catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for getting specific users from usersdb, user-imagesdb and user-profilesdb
const getUserById = async (id) => {
    try {
        console.log('get in service');
        const userId = parseInt(id);
        console.log('userId--', userId);

        const result = await User.findByPk(userId,
            {
                include: [
                    { model: User_Image, required: false },
                    { model: User_Profile, required: false }
                ]
            }
        )

        return result;
    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for ceating users in usersdb or signup
const addUser = async (newUser) => {
    try {
        const result = await User.create(newUser);
        // console.log('result--', result);
        return [result];
    }
    catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

//logic for login user 
const signinUser = async(newlogin)=>{
    try {
        const {email, password} = newlogin;
        result = await User.findOne({where:{email:email}})
        console.log('result--',result);
        if(result === null){throw new Error('User not found!');}
        const verify = bcrypt.compareSync(password, result.password);
        if(verify){  
            console.log('verify--',verify);
            
            const Token = generateToken(result.id, result.email, result.password);
            
            return {user:result, Token};
        }
        else{
            throw new Error('Password is Incorect!')
        }
    } catch (error) {
        throw new Error(error)
    }
}

// sql and database logic for updating specific users from usersdb
const updateUser = async (id, updatedData) => {
    try {
        //checking if updatedData object is not empty
        if (Object.keys(updatedData).length === 0) {
            console.log('enter in condition:', Object.keys(updatedData).length);

            throw new Error('please add data field you want to update!');
        }

        const userId = parseInt(id);
        const result = await User.update(updatedData, { where: { id: userId } })
        console.log("result---", result);
        return result;
    }
    catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
    }
}

// sql and database logic for deleting specific users from usersdb
const deleteUser = async (id) => {
    try {
        const userId = parseInt(id);
        const result = await User.destroy({ where: { id: userId } });
        console.log('result--', result);
        return result;
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
        console.log('Id--', userId);
        const extention = Path.extname(files.filename)
        console.log('extention--', extention);
        const newImage = {
            userId: userId,
            imageName: files.filename,
            path: files.path,
            mimeType: files.mimetype,
            extention: extention,
            size: files.size
        }

        const result = await User_Image.create(newImage)
        console.log('result--', result);

        return result;
    } catch (error) {
        throw new Error('something wrong in handling file')
    }
}

// sql and database logic for deleting images of specifc user from user_imagesdb
const deleteImage = async (userId) => {
    try {
        const Id = parseInt(userId);
        const result = User_Image.destroy({ where: { userId: Id } })
        return result;
    } catch (error) {
        throw new Error('something went wrong while deleting image!')
    }
}


//---------------------------------------------------------user Profile models

// sql and database logic for creating new profile in user_profiledb
const addUserProfile = async (newProfile) => {
    const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = newProfile;
    try {

        const result = await User_Profile.create(newProfile)
        return result;
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
        const result = await User_Profile.findByPk(Id)
        console.log('result[0]--', result);
        return result;
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

        const result = await User_Profile.update(updatedData, {
            where: {
                id: Id
            }
        })

        return result;

    } catch (error) {
        throw new Error('something went wrong while updating profile!')
    }
}

// sql and database logic for deleting specific profile from user_profiledb
const deleteUserProfile = async (id) => {
    try {
        const Id = parseInt(id);
        const result = await User_Profile.delete({
            where: {
                id: Id
            }
        })
        return result;
    } catch (error) {
        throw new Error('something went wrong while deleting profile!')
    }
}


//---------------------------------------user form model

const createForm = async (newForm) => {

    let { name, email, age, role, isActive, Path } = newForm;
    try {
        console.log('PATH--', Path);

        //  let isActive2 = isActive?1:0;
        isActive = isActive === "true"
        const query = `
        INSERT INTO user_forms (name, email, age, role, isActive, path)
        VALUES (?, ?, ?, ?, ?, ?)`;

        const values = [name, email, age, role, isActive, Path]
        const form = await db.query(query, values);

        return form[0];

    } catch (error) {
        throw new Error(`something went wrong while getting user:${error}`)
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
    deleteImage,
    createForm,
    signinUser
};
