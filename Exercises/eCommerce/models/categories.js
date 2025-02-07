const { DataTypes, Model } = require("sequelize");


module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            // One-to-Many: A Category has many Products
            this.hasMany(models.Product, {
              foreignKey: "category_id",
              as: "products", 
              onDelete: "CASCADE", 
            });
          }
     }

    Category.init({
        name: { type: DataTypes.STRING(100), allowNull: false,
          set(value) {
            this.setDataValue('name', value.toLowerCase()); 
        }
         },
    },
    {
        sequelize, 
        modelName: "Category", 
        tableName: "categories", 
        timestamps: true,
        indexes: [
            {
              unique: true,
              fields: ["name"],
              name: "unique_name_index",
            },
          ], 
    })
    return Category;
}