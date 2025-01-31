const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../models'); 

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    age: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.ENUM('User', 'Admin'), allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }, 
  },
  {
    sequelize,
    modelName: 'User', 
    tableName: 'users', 
  }
);

module.exports = User;
