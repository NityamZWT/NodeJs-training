const { DataTypes, Model } = require("sequelize");


module.exports = (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            // Many-to-One: A Product belongs to one Category
            this.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user", 
                // onDelete: "CASCADE",
            });
            this.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product", 
            });
        }
     }

    Cart.init({
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        product_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'products',
                key:'id'
            }
        },
        quantity:{type:DataTypes.INTEGER, defaultValue:1},
    },
        {
            sequelize,
            modelName: "Cart",
            tableName: "carts",
            timestamps: true,
        })
    return Cart;
}