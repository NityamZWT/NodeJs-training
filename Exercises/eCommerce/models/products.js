const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
        //     // Many-to-One: A Product belongs to one Category
            this.belongsTo(models.Category, {
                foreignKey: "category_id",
                as: "category", 
            });
            this.hasMany(models.Cart, {
                foreignKey: "product_id",
                as: "cart", 
                onDelete: "CASCADE", 
              });
              this.hasMany(models.Order_item, {
                foreignKey: "product_id",
                as: "order_item", 
                onDelete: "CASCADE", 
              });
              this.hasMany(models.Whishlist, {
                foreignKey: "product_id",
                as: "whishlist", 
                onDelete: "CASCADE", 
              });
        }
    }

    Product.init({
        name: { type: DataTypes.STRING(255), allowNull: false,
            set(value) {
                this.setDataValue('name', value.toLowerCase()); 
            }
        },
        description: { type: DataTypes.TEXT, allowNull: true },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        category_id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        image_url: { type: DataTypes.STRING(500), allowNull: true },
    },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: true,
        })
    return Product;
}