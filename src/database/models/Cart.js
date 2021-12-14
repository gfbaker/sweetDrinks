const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "Carts";

    const columns = {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    };

    const config = {
        tableName: "carts",
        timestamps: false
    };


    const Cart = sequelize.define(alias, columns, config);

    return Cart;

}