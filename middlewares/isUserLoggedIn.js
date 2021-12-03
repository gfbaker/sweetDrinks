const path = require('path');

const isUserLoggedIn= (req,res,next) => {
    if (req.session.usuarioLogueado == undefined){
        res.redirect ('/login');
    }else if (req.params.id != undefined){
        if(req.params.id != req.session.usuarioLogueado.id){
            console.log(req.params.id);
            console.log (req.session.usuarioLogueado.id);
            res.render (path.join(__dirname,"../src/views/not-found"));
        }else{
            next();
        }
    }else{
        next();
    }

};

module.exports=isUserLoggedIn;