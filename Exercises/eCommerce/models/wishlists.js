const { DataTypes, Model } = require("sequelize");


module.exports = (sequelize) => {
    class Whishlist extends Model {
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

     Whishlist.init({
        user_id:{type:DataTypes.INTEGER,
            references:{
                model:'users',
                key:'id'
            }
        },
        product_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'products',
                key:'id'
            }
        }
    },
        {
            sequelize,
            modelName: "Whishlist",
            tableName: "whishlists",
            timestamps: true,
        })
    return Whishlist;
}