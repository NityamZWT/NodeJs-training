const { Model, DataTypes } = require('sequelize');
const { seq } = require('../config/db');

class User extends Model { }

User.init({
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique:true, validate: { isEmail: true } },
    age: { type: DataTypes.INTEGER, allowNull:false },
    role:{type: DataTypes.ENUM('User','Admin'), allowNull:false},
    isActive:{type: DataTypes.ENUM(true, false), defaultValue: true}
},
    {
        sequelize: seq,
        // modelName: 'Product', 
    },
)

module.exports = User;

