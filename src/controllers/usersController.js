// Fuente de datos
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const session = require('express-session');

const db = require('../database/models');
// Objeto literal con acciones de cada ruta
const usersController = {

    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getNewUser: (req,res) => {res.render (path.join(__dirname,"../views/newUser"))},

    getUserProfile: (req,res) => {
        // Falta :
        //incluir AUthData para que tome los datos de email y los muestre en la vista

        db.Users
        .findByPk(req.params.id_user)
        .then((resultado) => {
            res.render (path.join(__dirname,"../views/users"),{user : resultado})
        })
        .catch(err => {
          res.send(err)
        })
        
        
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
                    {
                        "location": "body",
                        "msg": "Credenciales inválidas",
                        "param": "credenciales"
                    }
                ]})
            
            } else {

                req.session.usuarioLogueado = usuarioLogueado;

                res.redirect('/');
            }
        }    
    },

// Creacion de usuario
    postNewUser: (req,res) => {
        // Falta :
        //incluir AUthData para que tome los datos de email y contraseña y los guarde
        //Que busque en la base de datos que ese email no se repite

        let errors = validationResult(req)
       
        if(errors.isEmpty()){

            db.UsersAuthData.findOne({
                where: {
                    email: req.body.email
                }
            
            })
            .then(resultado => {
                if (resultado){
                    //si el usuario existe entra acá
                //  res.send(resultado)
                    res.render('newUser',{errors:[
                                    {"msg": 'Usuario existente',
                                    "param": "email"}
                                ]})
                }else{
                    //si el usuario no existe entra acá
                    // res.send("Aca en el else");
                    db.UsersAuthData.create({
                        
                        email : req.body.email,
                        contraseña: bcrypt.hashSync(req.body.contrasenia, 10),
                        admin : false

                    })
                    console.log("dentro del create");
                }                
            })  
            .then(()=>{
                db.UsersAuthData.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                console.log('Aca estoy');
            }) 
            .then(resultado =>{
                console.log('Ultimo log');
                // res.send(resultado)
            })  
            .catch(function(error){
                console.log(error)
            });

        //     db.Users.create({
        //         include:[{association: "usersAuthData"}],

         
        //         nombre: req.body.nombre,
        //         apellido: req.body.apellido,
        //         usuario: req.body.usuario,
        //         genero: req.body.genero,
        //         email: req.body.email,
        //         contraseña: bcrypt.hashSync(req.body.contrasenia, 10),
        //         confContr: req.body.confContr,
        //         telefono: req.body.telefono,
        //         imagen_id: req.file ? [req.file.filename] : ['generic-profile-picture.jpg']

        //     })
        //     userId = users[req.params.id_user];

        //  return res.redirect('user/' + users[users.length - 1].id);

        //    let usuarioExistente

        //     db.Users.findOne({
        //         include:[{association: "usersAuthData"}],
        //         where: {
        //             email: req.body.email
        //           }
        //         }).then(resultado =>{
        //            usuarioExistente = resultado
        //         })
        //         .catch(function(error){
        //             res.send(error)
        //         });
             
            
           
        //     if( usuarioExistente.length != 0){
        //         res.render('newUser',{errors:[
        //             {msg: 'Usuario existente'}
        //         ]});
        //         res.send(usuarioExistente)
        //     }else if (req.body.contrasenia != req.body.confContr ){
        //         res.render('newUser',{errors:[
        //             {msg: 'Las constraseñas no coinciden'}
        //         ]});
        //     }else{

            //     let newUser = {
            //         id : users[users.length - 1].id + 1,
            //         nombre: req.body.nombre,
            //         apellido: req.body.apellido,
            //         usuario: req.body.usuario,
            //         genero: req.body.genero,
            //         email: req.body.email,
            //         contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            //         confContr: req.body.confContr,
            //         telefono: req.body.telefono,
            //         imagen: req.file ? [req.file.filename] : ['generic-profile-picture.jpg']
            //     }

        
            //     users.push(newUser); 

            //     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        
            //     userId = users[req.params.id_user];

            //     return res.redirect('user/' + users[users.length - 1].id);
            // }
                
        }else{
            return res.render('newUser',{errors:errors.array()});
        }
       
    },

    editUser: (req, res) => {
    // Falta opcion de editar perfil de usuario
            db.Users
            .findByPk(req.params.id_user)
            .then(function(resultado){
                
                res.render (path.join(__dirname,"../views/userEditForm"),{ userToEdit: resultado});
            })
            .catch(function(error){
                console.log(error)
            });
            

    },
            
    updateUser: (req, res) => {

		let errors = validationResult(req)

        if(errors.isEmpty()){
			
                 db.Users
                 .update({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    usuario: req.body.usuario,
                    genero: req.body.genero,
                    email: req.body.email,
                    contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                    confContr: req.body.confContr,
                    telefono: req.body.telefono,
                    imagen: req.file ? [req.file.filename] : ['generic-profile-picture.jpg']
                 }, {
                     where:{
                         id: req.params.id
                     }})
                    

                .then(function(resultado){

                    res.render (path.join(__dirname,"../views/userEditForm"),{ userToEdit: resultado});

                })
                .catch(function(error){
                    console.log(error)
                });	
                res.redirect('user/' + req.params.id_user)
	    }else{
			res.render('userEditForm',{errors:errors.array()});
		}
    },

    // Eliminar Cuenta
    destroyUser: (req, res) => {

        db.Users.destroy({
            where: {id: req.params.id_user}
         });
         

		// let filterUser = users.filter((user) => user.id != req.params.id_user);

		// fs.writeFileSync(usersFilePath, JSON.stringify(filterUser, null, " "));

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