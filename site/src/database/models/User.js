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
        },
        userAuthData_id: {
            type: DataTypes.INTEGER,
        }

    };

    const config = {
        tableName: "users",
        timestamps: false
    };


    const User = sequelize.define(alias, columns, config);

    User.associate = function (models){
        User.belongsTo (
            models.UsersAuthData, 
            {
            as: 'usersAuthData',
            foreignKey: "userAuthData_id"
            }
        ),
        User.hasMany (
            models.Carts, 
            {
            as: 'carts',
            foreignKey: "user_id"
            }
        )
    }
    
    return User;


}