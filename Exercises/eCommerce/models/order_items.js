const { DataTypes, Model } = require("sequelize");


module.exports = (sequelize) => {
    class Order_item extends Model {
        static associate(models) {
            // Many-to-One: A Product belongs to one Category
            this.belongsTo(models.Order, {
                foreignKey: "order_id",
                as: "order", 
            });
            this.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product", 
            });
        }
     }

     Order_item.init({
        order_id:{type:DataTypes.INTEGER,
            references:{
                model:'orders',
                key:'id'
            }
        },
        product_id:{type:DataTypes.INTEGER,
            references:{
                model:'products',
                key:'id'
            }
        },
        quantity:{type:DataTypes.INTEGER, allowNull:false},

         price:{type: DataTypes.DECIMAL(10,2), allowNull:false},
    },
        {
            sequelize,
            modelName: "Order_item",
            tableName: "order_items",
            timestamps: true,
        })
    return Order_item;
}