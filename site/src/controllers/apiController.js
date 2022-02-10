// Acá nos falta nuestra fuente de datos
const fetch = require('node-fetch')


const db = require('../database/models');

// Acá nos falta un objeto literal con las acciones para cada ruta
const apiController = {
    getUsers: (req,res) => {
        db.Users.findAll({
            include:[{association: "usersAuthData"}]
            
        })
        .then(users =>{
            let usersInDb ={
                meta: {
                    status: 200,
                    count: users.length,
                    url: 'api/users'
                },
                data: users.map(element => {
                    return {
                        id : element.id,
                        name : element.nombre,
                        email: element.usersAuthData.email,
                        detail: "/api/users/" + element.id
                    }
                })
            
            }
            res.json(usersInDb)

        })
        .catch(error => console.log(error))
       
   

   
    },
    getUsersId: (req,res) => {
        db.Users.findByPk(req.params.id)
        .then(user =>{
            let userInDb ={
                meta: {
                    status: 200,                   
                    url: 'api/users/' + user.id
                },
                data:{
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    telefono: user.telefono,
                    imagen_id: req.protocol + "://" + req.hostname + ":3080/img/imgUsers/" + JSON.parse(user.imagen_id)[0]
                    
                }           
            }
            res.json(userInDb)

        })
        .catch(error => console.log(error))     
   

   
    },
    getProducts: async (req,res) => {  
        let productsInCategory = []

        try{productsInCategory = await db.Categories.findAll({
            include:[{association:"products"}]
         })
        }catch(error){console.log(error)}
        productsInCategory= productsInCategory.map(element => {
            return{
               categoria: element.tipo,
               total: element.products.length
            }
            
        });
        db.Products.findAll({
            include:[{association: "images"},{association: "categories"}]
        })
        .then(products =>{
            
            let productsInDb ={
                meta: {
                    status: 200,
                    count: products.length,
                    countByCategory: productsInCategory,
                    url: 'api/products'
                },
                data: products.map(element => {
                    return {
                        id : element.id,
                        name : element.nombre,
                        descripcion: element.descripcion,
                        detail: "/api/products/" + element.id
                    }
                })
            
            }
            res.json(productsInDb)

        })
        .catch(error => console.log(error))
       
   

   
    },
    getProductsId:(req,res) =>{
            
        fetch(`http://localhost:3080/api/products/${req.params.id}/images`)
        .then(respuesta => respuesta.json())
        .then(imagenes =>{
            db.Products.findByPk(req.params.id)
            .then(product =>{
                let productInDb ={
                    meta: {
                        status: 200,                   
                        url: 'api/product/' + product.id
                    },
                    data:{
                        id: product.id,
                        nombre: product.nombre,
                        precio: product.precio,
                        porcentajeAlcohol: product.porcentajeAlcohol,
                        imagenes:imagenes
                        
                    }           
                }
                res.json(productInDb)

            })
            .catch(error => console.log(error))   
        })

           
   
   
       
   
    },
    getProductsIdImages: (req,res) =>{
            db.Images.findAll({
                where: {
                    product_id : req.params.id
                }
            })
            .then(resultado => {

              res.json(resultado.map(imagen => {
                   return  req.protocol + "://" + req.hostname + ":3080/img/imgProduct/" + imagen.nombre
               }))
            })
            .catch(e=>console.log(e))
         


}
}
// Acá exportamos el resultado
module.exports = apiController;