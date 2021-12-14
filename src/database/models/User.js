const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "Users";

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
        apellido: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        telefono: {
            type: DataTypes.STRING(20),
        },
        imagen_id: {
            type: DataTypes.STRING(100),
        }

    };

    const config = {
        tableName: "users",
        timestamps: false
    };


    const User = sequelize.define(alias, columns, config);

    return User;

}