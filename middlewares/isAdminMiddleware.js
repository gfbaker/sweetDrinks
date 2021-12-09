const path = require('path');

const isAdminMiddleware= (req,res,next) => {

    if (req.session.usuarioLogueado.privilegios != "admin"){
        console.log("entro")
        res.render (path.join(__dirname,"../src/views/not-found"));
    }

    next();
};

module.exports=isAdminMiddleware;