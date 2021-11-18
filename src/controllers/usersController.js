// Fuente de datos
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Objeto literal con acciones de cada ruta
const usersController = {
    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getNewUser: (req,res) => {res.render (path.join(__dirname,"../views/newUser"))},

    getUserProfile: (req,res) => {
        user = users[req.params.id-1];
        res.render (path.join(__dirname,"../views/users"),{user});
    },

    postLogin: (req,res) => {

        res.send('☺☻Login en proceso☻☺')
        
    // TODAVIA TRABAJANDO EN EL LOGIN


    //     let errors = validationResult(req)
       
    //     if(errors.isEmpty()){

           
    //     for(let i=0 ; i < users.length; i++){
    //         if(users[i].usuario == req.body.usuario){
    //             if (bcrypt.compareSync(req.body.contrasenia, users[i].contrasenia)){
    //                var usuarioLogueado = users[i];
    //                break;
    //             }
            
    //     }if(usuarioLogueado == undefined){
    //         return res.render('login', {errors:[
    //             {msg: 'Por favor vuelve a ingresar usuario y contraseña'}
    //         ]})
         

    //     req.session.usuarioLogueado = usuarioLogueado;
        
    //     res.redirect('users')
       
    //     }
    // }


    // }else{
    //        return res.redirect('/login',{errors:errors.errors});
    //     }

      
        
    },
// Creacion de usuario, falta redireccionar a su perfil 
    postNewUser: (req,res) => {

        console.log(req.body);

       

        let newUser = {
            id : users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            genero: req.body.genero,
            mail: req.body.mail,
            contrasenia: bcrypt.hashSync(req.body.contrasenia),
            confContr: req.body.confContr,
            telefono: req.body.telefono,
            imagen: req.file ? [req.file.filename] : ['']
        }

       
    users.push(newUser); 

			fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
	
            userId = users[req.params.id];
			res.redirect('/');
    },

    // Falta opcion de editar perfil de usuario

    // Eliminar Cuenta
    destroyUser: (req, res) => {

		let filterUser = users.filter((user) => user.id != req.params.id);

		fs.writeFileSync(usersFilePath, JSON.stringify(filterUser, null, " "));

		res.redirect('/');
	  }
};

// Exportar Controller
module.exports = usersController;