// Acá nos falta nuestra fuente de datos
const path = require('path');

// Acá nos falta un objeto literal con las acciones para cada ruta
const mainController = {
    getIndex: (req,res) => {res.render (path.join(__dirname,"../views/index"))},
    getCarrito1: (req,res) => {res.render (path.join(__dirname,"../views/carrito1"))},
    getCarrito2: (req,res) => {res.render (path.join(__dirname,"../views/carrito2"))},
    getLogin: (req,res) => {res.render (path.join(__dirname,"../views/login"))},
    getRegistro: (req,res) => {res.render (path.join(__dirname,"../views/registro"))},

    postIndex: (req,res) => {res.redirect('/');},
    postCarrito1: (req,res) => {res.redirect('/');},
    postCarrito2: (req,res) => {res.redirect('/');},
    postLogin: (req,res) => {res.redirect('/');},
    postRegistro: (req,res) => {res.redirect('/');},


}
// Acá exportamos el resultado
module.exports = mainController;