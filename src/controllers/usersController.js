// Fuente de datos
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
// Objeto literal con acciones de cada ruta

const usersController = {

    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getNewUser: (req,res) => {res.render (path.join(__dirname,"../views/newUser"))},

    getUsersList: (req,res)=> {
        db.Users
        .findAll({
            include:[{association: "usersAuthData"}]
        })
        .then(resultado =>{

            let usersToShow = resultado           
            res.render(path.join(__dirname,"../views/usersList"),{usersToShow});

        })
        .catch(e =>{
            res.send(e)
        })
          
},

    getUserProfile: (req,res) => {
        // Falta :
        //incluir AUthData para que tome los datos de email y los muestre en la vista
        // res.send (req.params.id_user)
        db.Users
        .findOne({
            include:[{association: "usersAuthData"}],
            where: {
              id: req.params.id_user
            }
          })
        .then( resultado => {
            resultado.imagen_id = JSON.parse(resultado.imagen_id)
            // res.send(resultado)
            res.render (path.join(__dirname,"../views/users"),{user : resultado})
        })
        .catch(err => {
          res.send(err)
        })
        
        
    },

    postLogin: async (req,res) => {

        let errors = validationResult(req)
        let credenciales = [];

        if(errors.isEmpty()){
           
            credenciales = await db.UsersAuthData.findOne({
                where: {
                    email: req.body.email
                }            
            })
            
            if (credenciales){
                //si el mail existe, entra acá

                if (bcrypt.compareSync(req.body.contrasenia, credenciales['contraseña'])){
                    usuario = await db.Users.findOne({
                        include:[{association: "usersAuthData"}],
                        where: {
                            userAuthData_id: credenciales['id']
                        }            
                    })
                    req.session.usuarioLogueado = usuario;

                    if (req.body.recordar != undefined){
                        //si un checkbox no está tildado, se recibe undefined. Cuando está tildado 
                        res.cookie('recordarUsuario', req.body.email,{maxAge: 3600000})
                    }

                    res.redirect('/');
                    }else{
                    res.render('login', {errors:[
                        {
                            "location": "body",
                            "msg": "Credenciales inválidas",
                            "param": "credenciales"
                        }
                    ]}) 
                }
            

                
            }else{
            //si el mail no existe, entra acá
                res.render('login',{errors:[
                    {"msg": 'El mail indicado no está registrado',
                    "param": "credenciales"}
                ]})
            }
     
          
        }else{
            res.render('login',{errors:errors.array()});
        }  
    },
// Creacion de usuario
    postNewUser: async (req,res) => {
        // Falta :
        //incluir AUthData para que tome los datos de email y contraseña y los guarde
        //Que busque en la base de datos que ese email no se repite

        let errors = validationResult(req)
        // req.file ? res.send (JSON.stringify([req.file.filename])) : res.send (JSON.stringify(['generic-profile-picture.jpg']))

     
        if(errors.isEmpty()){
            //Busca si el mail ya existe o no
            usuarioExistente = await db.UsersAuthData.findOne({
                where: {
                    email: req.body.email
                }            
            })

            if (usuarioExistente){
                //si el usuario existe, entra acá
                res.render('newUser',{errors:[
                                {"msg": 'Usuario existente',
                                "param": "email"}
                            ]})
            }else{
                //si el usuario no existe, entra acá y crea el registro en la tabla UsersAuthData
                credencialesCreadas = await db.UsersAuthData.create({
                    email : req.body.email,
                    contraseña: bcrypt.hashSync(req.body.contrasenia, 10),
                    admin : false

                })
                
                usuarioCreado = await db.Users.create({            
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    telefono: req.body.telefono,
                    imagen_id: req.file ? JSON.stringify([req.file.filename]) : JSON.stringify(['generic-profile-picture.jpg']),
                    userAuthData_id: credencialesCreadas['id']

                })

                

                usuario = await db.Users.findOne({
                    include:[{association: "usersAuthData"}],
                    where: {
                        userAuthData_id: credencialesCreadas['id']
                    }            
                })
                req.session.usuarioLogueado = usuario;
                              
                res.redirect('user/' + usuarioCreado['id'])                  

            }              
        }else{
            return res.render('newUser',{errors:errors.array()});
        }
       
    },

    editUser: (req, res) => {
    // Falta opcion de editar perfil de usuario
            db.Users
            .findOne({
                include:[{association: 'usersAuthData'}],
                where: {
                    id: req.params.id_user
                }
            })
            .then(function(resultado){
                resultado.imagen_id = JSON.parse(resultado.imagen_id)
                let userToEdit = resultado
                res.render(path.join(__dirname,"../views/userEditForm"),{userToEdit});
            })
            .catch(function(error){
                console.log(error)
            });
            

    },
            
    updateUser: async(req, res) => {
        
		let errors = validationResult(req)

        if(errors.isEmpty()){
                        
            
                let credencialesActualizadas = await db.UsersAuthData.update({
                    email : req.body.email,
                    contraseña: bcrypt.hashSync(req.body.contrasenia, 10)
                },{
                    where : {id:req.params.id_user}
                })
                
                
                 db.Users
                 .update({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    telefono: req.body.telefono,
                    imagen_id: req.file ? JSON.stringify([req.file.filename]) : JSON.stringify(['generic-profile-picture.jpg']),
                    userAuthData_id: credencialesActualizadas['id_user']
                 },{
                     where :{id: req.params.id_user}
                 })
                

                    res.redirect('/user/' + req.params.id_user)

                
	    }else{
			res.render('userEditForm',{errors:errors.array()});
		}
    },

    // Eliminar Cuenta
    destroyUser: async (req, res) => {
        let id = Number(req.params.id_user)
        await db.Users.destroy({            
            where: {id: id}
         })
         await db.UsersAuthData.destroy({
             where : {id:id}
         })
        
         

		// let filterUser = users.filter((user) => user.id != req.params.id_user);

		// fs.writeFileSync(usersFilePath, JSON.stringify(filterUser, null, " "));

		res.redirect('/usersList');
	  },

    // Cerrar session
    endSession: (req, res) => {

        req.session.destroy();
        res.clearCookie('recordarUsuario')
        res.redirect('/');
    }
};



// Exportar Controller
module.exports = usersController;