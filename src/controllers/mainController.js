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
    getProductoNuevo: (req,res) => {res.render (path.join(__dirname,"../views/productoNuevo"))},

    postIndex: (req,res) => {res.redirect('/');},
    postCarrito1: (req,res) => {res.redirect('/');},
    postCarrito2: (req,res) => {res.redirect('/');},
    postLogin: (req,res) => {res.redirect('/');},
    postRegistro: (req,res) => {res.redirect('/');},
    postProductoNuevo: (req,res) => {res.redirect('/')},


}
// Acá exportamos el resultado
module.exports = mainController;