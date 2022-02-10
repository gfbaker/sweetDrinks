const db = require('../src/database/models');

const recordarMiddleware = async (req,res,next) => {

    if (req.session.usuarioLogueado == undefined && req.cookies.recordarUsuario != undefined ){

        credenciales = await db.UsersAuthData.findOne({
            where: {
                email: req.cookies.recordarUsuario
            }            
        })

        usuario = await db.Users.findOne({
            include:[{association: "usersAuthData"}],
            where: {
                userAuthData_id: credenciales['id']
            }            
        })

        req.session.usuarioLogueado = usuario;

    }
    next();
};

module.exports=recordarMiddleware;