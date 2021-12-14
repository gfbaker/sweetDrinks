const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "CartDetails";

    const columns = {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    };

    const config = {
        tableName: "cartDetails",
        timestamps: false
    };


    const CartDetail = sequelize.define(alias, columns, config);

    return CartDetail;

}