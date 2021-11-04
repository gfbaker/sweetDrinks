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
    getCarrito1: (req,res) => {res.render (path.join(__dirname,"../views/carrito1"))},
    getCarrito2: (req,res) => {res.render (path.join(__dirname,"../views/carrito2"))},
    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getRegistro: (req,res) => {res.render (path.join(__dirname,"../views/registro"))},
    

    postIndex: (req,res) => {
        res.redirect('/');
    },
    
    postCarrito1: (req,res) => {
        res.redirect('/');
    },

    postCarrito2: (req,res) => {
        res.redirect('/');
    },

    postLogin: (req,res) => {

        let login = {
            usuario: req.body.usuario,
            contraseña: req.body.contraseña,
        }

        res.redirect('/');
    },

    postRegistro: (req,res) => {

        let registro = {
            usuario: req.body.usuario,
            mail: req.body.mail,
            password: req.body.password,
            confPass: req.body.confPass,
            telefono: req.body.telefono
        }

        res.redirect('/');
    },


    postProductoNuevo: (req,res) => {

        let datosProductoNuevo = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            alcohol: req.body.alcohol,
            volumen: req.body.volumen,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            stock: req.body.stock,
            descuento: req.body.descuento,
            oferta: req.body.oferta,
            importado: req.body.importado,
            esPack: req.body.esPack,
            categoria: req.body.categoria
        }


        res.redirect('/');
    },

   
}
// Acá exportamos el resultado
module.exports = mainController;