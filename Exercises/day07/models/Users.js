const { Model, DataTypes } = require('sequelize');
const { seq } = require('../config/db');
const bcrypt = require('bcrypt');
const { logger } = require('sequelize/lib/utils/logger');
const saltRounds = 10;

class User extends Model { }

User.init({
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique:true, validate: { isEmail: true } },
    password:{type:DataTypes.STRING, 
        set(value){
            console.log('value', value);
            
            if(value){
                console.log('hashed--',bcrypt.hash(value, saltRounds));
                this.setDataValue('password',bcrypt.hashSync(value, saltRounds))
            }
        }
    },
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

