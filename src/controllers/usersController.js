// Fuente de datos
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const session = require('express-session');

// Objeto literal con acciones de cada ruta
const usersController = {

    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getNewUser: (req,res) => {res.render (path.join(__dirname,"../views/newUser"))},

    getUserProfile: (req,res) => {
        user = users[req.params.id-1];
        res.render (path.join(__dirname,"../views/users"),{user});
    },

    postLogin: (req,res) => {

        let errors = validationResult(req)
       
        if(errors.isEmpty()){
 
            let usersRegistrados = users;
            for(let i=0 ; i < usersRegistrados.length; i++){

                if(usersRegistrados[i].email == req.body.email){

                    if (bcrypt.compareSync(req.body.contrasenia, usersRegistrados[i].contrasenia)){    
                    
                        var usuarioLogueado = usersRegistrados[i];
 
                    break;
                    }
                }
            }
  
            if(usuarioLogueado == undefined){
                res.render('login', {errors:[
                    {msg: 'Por favor vuelve a ingresar E-mail y contraseña'}
                ]})
            
            } else {

                req.session.usuarioLogueado = usuarioLogueado;

                res.redirect('/');
            }
        }    
    },

// Creacion de usuario, falta buscar que el email no se repita
    postNewUser: (req,res) => {

        let errors = validationResult(req)
       
        if(errors.isEmpty()){
            let usuarioExistente = users.filter( function (user){
                return user.email == req.body.email;
            })
            if( usuarioExistente.length != 0){
                res.render('newUser',{errors:[
                    {msg: 'Usuario existente'}
                ]});
                res.send(usuarioExistente)
            }else if (req.body.contrasenia != req.body.confContr ){
                res.render('newUser',{errors:[
                    {msg: 'Las constraseñas no coinciden'}
                ]});
            }else{
                let newUser = {
                    id : users[users.length - 1].id + 1,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    usuario: req.body.usuario,
                    genero: req.body.genero,
                    email: req.body.email,
                    contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                    confContr: req.body.confContr,
                    telefono: req.body.telefono,
                    imagen: req.file ? [req.file.filename] : ['']
                }

        
                users.push(newUser); 

                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        
                userId = users[req.params.id];

                return res.redirect('user/' + users[users.length - 1].id);
            }
                
        }else{
            return res.render('newUser',{errors:errors.array()});
        }
       
    },

    // Falta opcion de editar perfil de usuario

    // Eliminar Cuenta
    destroyUser: (req, res) => {

		let filterUser = users.filter((user) => user.id != req.params.id);

		fs.writeFileSync(usersFilePath, JSON.stringify(filterUser, null, " "));

		res.redirect('/');
	  },

    // Cerrar session
    endSession: (req, res) => {

        req.session.destroy();
        res.redirect('/');
    }
};



// Exportar Controller
module.exports = usersController;