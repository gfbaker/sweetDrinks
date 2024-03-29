const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "Images";

    const columns = {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull:false
        }
    };

    const config = {
        tableName: "images",
        timestamps: false
    };


    const Image = sequelize.define(alias, columns, config);

    Image.associate = function (models){
        Image.belongsTo (
            models.Products, 
            {
            as: 'products',
            foreignKey: "product_id"
            }
        )
    }

    return Image;

}