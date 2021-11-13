// Acá nos falta nuestra fuente de datos
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Acá nos falta un objeto literal con las acciones para cada ruta
const mainController = {
    getIndex: (req,res) => {
        ofertas = products.filter(function(producto){
			return producto.oferta == true;
		});

        importados = products.filter(function(producto){
			return producto.importado == true;
		});

        packs = products.filter(function(producto){
			return producto.esPack == true;
		});
        res.render (path.join(__dirname,"../views/index"),{ofertas, importados, packs})
    },
    getCart: (req,res) => {res.render (path.join(__dirname,"../views/cart"))},
    getConfirmation: (req,res) => {res.render (path.join(__dirname,"../views/confirmation"))},
    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getNewUser: (req,res) => {res.render (path.join(__dirname,"../views/newUser"))},
    

    postIndex: (req,res) => { 
        res.redirect('/');
    },
    
    postCart: (req,res) => {
        res.redirect('/');
    },

    postConfirmation: (req,res) => {
        res.redirect('/');
    },

    postLogin: (req,res) => {

        let login = {
            usuario: req.body.usuario,
            contraseña: req.body.contraseña,
        }

        res.redirect('/');
    },

    postNewUser: (req,res) => {

        let newUser
 = {
            usuario: req.body.usuario,
            mail: req.body.mail,
            password: req.body.password,
            confPass: req.body.confPass,
            telefono: req.body.telefono
        }

        res.redirect('/');
    }

   
}
// Acá exportamos el resultado
module.exports = mainController;