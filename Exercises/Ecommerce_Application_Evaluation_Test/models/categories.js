const { DataTypes, Model } = require("sequelize");


module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            // One-to-Many: A Category has many Products
            this.hasMany(models.Product, {
              foreignKey: "category_id",
              as: "products", 
            //   onDelete: "CASCADE", 
            });
          }
     }

    Category.init({
        name: { type: DataTypes.STRING(100), allowNull: false, unique:true },
    },
    {
        sequelize, 
        modelName: "Category", 
        tableName: "categories", 
        timestamps: true, 
    })
    return Category;
}