const path = require('path');

const isAdminMiddleware= (req,res,next) => {

    if (req.session.usuarioLogueado.privilegios != "admin"){
        res.render (path.join(__dirname,"../src/views/not-found"));
    }else{
        next();
    }

};

module.exports=isAdminMiddleware;