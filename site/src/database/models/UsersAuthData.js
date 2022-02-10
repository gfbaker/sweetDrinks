const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes)=>{
    const alias = "UsersAuthData";

    const columns = {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        contraseña: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
    };

    const config = {
        tableName: "usersauthdata",
        timestamps: false
    };


    const UserAuthData = sequelize.define(alias, columns, config);
    
    UserAuthData.associate = function (models){
        UserAuthData.hasOne (
            models.Users, 
            {
            as: 'users',
            foreignKey: "userAuthData_id"
            }
        )
    }
    return UserAuthData;

}