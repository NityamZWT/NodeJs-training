const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user", 
                // onDelete: "CASCADE",
            });
            this.hasMany(models.Order_item, {
                foreignKey: "order_id",
                as: "oder_item", 
              //   onDelete: "CASCADE", 
              });
          }
     }

    Order.init({
        user_id: { type: DataTypes.INTEGER,
            references:{
                model:'users',
                key:'id'
            }
        },
        total_price:{type: DataTypes.DECIMAL(10,2), allowNull:false},
        status:{type:DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'), defaultValue:'pending'}
    },
    {
        sequelize, 
        modelName: "Order", 
        tableName: "orders", 
        timestamps: true, 
    })
    return Order;
}