const { Model, DataTypes } = require('sequelize');
const { seq } = require('../config/db');
const User = require('./Users')

class User_Profile extends Model { }

User_Profile.init({
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
    bio: { type: DataTypes.STRING, allowNull: false },
    linkedInUrl: { type: DataTypes.STRING, allowNull:false },
    facebookUrl:{type: DataTypes.STRING, allowNull:false},
    instaUrl:{type: DataTypes.STRING, allowNull:false},
},
    {
        sequelize: seq,
        tableName: 'user_profiles', 
    },
)
User.hasOne(User_Profile, {foreignKey:'userId', onDelete: 'CASCADE'});
User_Profile.belongsTo(User,{foreignKey:'userId', onDelete: 'CASCADE'})

module.exports = User_Profile;
