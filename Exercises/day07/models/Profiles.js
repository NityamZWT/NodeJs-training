// models/User_Profile.js
const { sequelize } = require('./index');  // Import sequelize from index.js
const { Model, DataTypes } = require('sequelize');

console.log('Sequelize Instance:', sequelize);  // This should print the Sequelize instance

class User_Profile extends Model {}

User_Profile.init(
  {
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: {
        model: 'users',  // The name of the referenced model in the database
        key: 'id',
      },
      onDelete: 'CASCADE',  // Define cascading behavior on deletion
    },
    bio: { type: DataTypes.STRING, allowNull: false },
    linkedInUrl: { type: DataTypes.STRING, allowNull: false },
    facebookUrl: { type: DataTypes.STRING, allowNull: false },
    instaUrl: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,  // The Sequelize instance is passed here
    tableName: 'user_profiles',  // Specify the table name in the database
  }
);

module.exports = User_Profile;
