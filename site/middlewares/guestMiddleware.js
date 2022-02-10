const path = require('path');

const guestMiddleware= (req,res,next) => {
    if (req.session.usuarioLogueado){
        res.redirect ('/user/'+req.session.usuarioLogueado.id);
        
    }
    next();
};

module.exports=guestMiddleware;