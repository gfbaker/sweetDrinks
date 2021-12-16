const path = require('path');

const isUserLoggedIn= (req,res,next) => {
    if (req.session.usuarioLogueado == undefined){
        res.redirect ('/login');
    }else if (req.params.id_user != undefined){
        if(req.params.id_user != req.session.usuarioLogueado.id){
            res.render (path.join(__dirname,"../src/views/not-found"));
        }else{
            next();
        }
    }else{
        next();
    }

};

module.exports=isUserLoggedIn;