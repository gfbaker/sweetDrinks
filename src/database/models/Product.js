const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "Products";

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
        },
        precio: {
            type: DataTypes.DECIMAL,
            allowNull:false
        },
        porcentajeAlcohol: {
            type: DataTypes.DECIMAL
        },
        volumen: {
            type: DataTypes.DECIMAL,
            allowNull:false
        }        ,
        descripcion: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        descuento: {
            type: DataTypes.INTEGER,
        },
        oferta: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        },
        importado: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        },
        esPack: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
    };

    const config = {
        tableName: "products",
        timestamps: false
    };


    const Product = sequelize.define(alias, columns, config);

    Product.associate = function (models){
        Product.belongsTo (
            models.Categories, 
            {
            as: 'categories',
            foreignKey: "categoria_id"
            }
        )
    };

    Product.associate = function (models){
        Product.hasMany (
            models.Images, 
            {
            as: 'images',
            foreignKey: "product_id"
            }
        )
    };

    Product.associate = function (models){
        Product.hasMany (
            models.CartDetails, 
            {
            as: 'cartDetails',
            foreignKey: "product_id"
            }
        )
    };

    return Product;

}