const { DataTypes, Model } = require("sequelize");
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
        //     // One-to-Many: A Category has many Products
            this.hasOne(models.Cart, {
              foreignKey: "user_id",
              as: "cart", 
              onDelete: "CASCADE", 
            });
            this.hasMany(models.Order, {
                foreignKey: "user_id",
                as: "order", 
                onDelete: "CASCADE", 
              });
              this.hasOne(models.Whishlist, {
                foreignKey: "user_id",
                as: "whishlist", 
                onDelete: "CASCADE", 
              });
          }
     }

    User.init({
        first_name: { type: DataTypes.STRING(100), allowNull: false },
        last_name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false },
        password: {
            type: DataTypes.STRING(255),
            set(value) {
                console.log('value', value);

                if (value) {
                    console.log('hashed--', bcrypt.hashSync(value, saltRounds));
                    this.setDataValue('password', bcrypt.hashSync(value, saltRounds))
                }
            },
            // Hides the password whenever it's accessed
            // get() {
            //     return undefined; 
            //   }
        },
        role:{
            type: DataTypes.ENUM('admin', 'customer'), defaultValue:'customer',
            // Convert to lowercase before storing
            set(value) {
                if (value) {
                  this.setDataValue('role', value.toLowerCase()); 
                }
              }
        },
    },
    {
        sequelize, 
        modelName: "User", 
        tableName: "users", 
        timestamps: true, 
        indexes: [
            {
              unique: true,
              fields: ["email"],
              name: "unique_email_index",
            },
          ],
        // defaultScope:{
        //   attributes:{exclude:["password", "createdAt", "updatedAt"]},
        // },
        // scope:{
        //   createAtAndUpdateAt:{ attributes: { include: ['createdAt','updatedAt'] } },
        //   withPassword: {
        //     attributes: { include: ["password"] }, 
        //   },
        // },
    })
    return User;
}