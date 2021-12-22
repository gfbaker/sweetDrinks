const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "Categories";

    const columns = {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING(100),
            allowNull:false
        }
    };

    const config = {
        tableName: "categories",
        timestamps: false
    };


    const Category = sequelize.define(alias, columns, config);

    Category.associate = function (models){
        Category.hasMany (
            models.Products, 
            {
            as: 'products',
            foreignKey: "categoria_id"
            }
        )
    }
    return Category;

}