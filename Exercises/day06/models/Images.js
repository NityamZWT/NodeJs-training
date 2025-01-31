const { Model, DataTypes } = require('sequelize');
const { seq } = require('../config/db');
const User = require('./Users')

class User_Image extends Model { }

User_Image.init({
    userId: 
    { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references:{
            model: 'users',
            key:'id'
        }, 
        onDelete: 'CASCADE',
    },
    imageName: { type: DataTypes.STRING, allowNull: false, unique:true },
    path: { type: DataTypes.STRING, allowNull:false },
    mimeType:{type: DataTypes.ENUM('image/jpeg','image/png'), allowNull:false},
    extention:{type: DataTypes.STRING, allowNull:false},
    size:{type:DataTypes.INTEGER, allowNull:false},
},
    {
        sequelize: seq,
        tableName: 'user_images', 
        updateAt: false,
    },
)
User.hasOne(User_Image, {foreignKey:'userId', onDelete: 'CASCADE'});
User_Image.belongsTo(User,{foreignKey:'userId', onDelete: 'CASCADE'})

module.exports = User_Image;
