// Acá nos falta nuestra fuente de datos
const path = require('path');

// Acá nos falta un objeto literal con las acciones para cada ruta
const productController = {
    getProductDetail: (req,res) => {res.render (path.join(__dirname,"../views/productDetail"))},
    postProductDetail: (req,res) => {res.redirect('/');},
}
// Acá exportamos el resultado
module.exports = productController;