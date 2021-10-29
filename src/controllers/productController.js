// Acá nos falta nuestra fuente de datos
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



// Acá nos falta un objeto literal con las acciones para cada ruta
const productController = {
    getProductDetail: (req,res) => {
        product = products[req.params.id-1];
        res.render (path.join(__dirname,"../views/productDetail"),{product});
    },

    postProductDetail: (req,res) => {res.redirect('/');},

    // Update - Form to edit
	edit: (req, res) => {
		productToEdit = products[req.params.id-1];
        //res.send ("Esta es una prueba");
		res.render (path.join(__dirname,"../views/productEditForm"),{ productToEdit});

	},
	// Update - Method to update
	update: (req, res) => {
		res.send ("Esta funcion recibe por PUT los datos del formulario de edicion. Tiene que poder guardar lo que recibe en la base de datos");
	},


}
// Acá exportamos el resultado
module.exports = productController;