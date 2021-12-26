// Acá nos falta nuestra fuente de datos
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models');

// Acá nos falta un objeto literal con las acciones para cada ruta
const mainController = {
    getIndex: (req,res) => {
        	
        Promise.all([        
            db.Products
            .findAll({
                include:[{association: "images"},{association: "categories"}],
                where: {
                    oferta: true
                }
            }),
            db.Products
            .findAll({
                include:[{association: "images"},{association: "categories"}],
                where: {
                    importado: true
                }
            }),
            db.Products
            .findAll({
                include:[{association: "images"},{association: "categories"}],
                where: {
                    esPacK: true
                }
            })
        ])
        .then(function([ofertas,importados,packs]){
            res.render (path.join(__dirname,"../views/index"),{ofertas, importados, packs})
        })
    },

    getCart: (req,res) => {res.render (path.join(__dirname,"../views/cart"))},
    
    getConfirmation: (req,res) => {res.render (path.join(__dirname,"../views/confirmation"))},
  
    

    postIndex: (req,res) => { 
        res.redirect('/');
    },
    
    postCart: (req,res) => {
        res.redirect('/');
    },

    postConfirmation: (req,res) => {
        res.redirect('/');
    },

   

   
}
// Acá exportamos el resultado
module.exports = mainController;