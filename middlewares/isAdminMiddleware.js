const path = require('path');

const isAdminMiddleware= (req,res,next) => {

    if (req.session.usuarioLogueado.usersAuthData.admin != true){
        res.render (path.join(__dirname,"../src/views/not-found"));
    }else{
        next();
    }

};

module.exports=isAdminMiddleware;