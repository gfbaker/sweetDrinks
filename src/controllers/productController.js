// Acá nos falta nuestra fuente de datos
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



// Acá nos falta un objeto literal con las acciones para cada ruta
const productController = {

	getProducts: (req,res) => {
		categoria = req.params.categoria;
		if (categoria == undefined){
			productsToShow = products;
			categoria = "Todos los productos";
		}else{
			productsToShow = products.filter (function (product){
				return product.categoria.toUpperCase() == categoria.toUpperCase();
			})
			categoria = categoria.toUpperCase();
		}
		//res.send (productsToShow)
		res.render (path.join(__dirname,"../views/products"),{productsToShow, categoria});

    },

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
		//res.send ("Esta funcion recibe por PUT los datos del formulario de edicion. Tiene que poder guardar lo que recibe en la base de datos");
		console.log(req.params.id)
		// products.forEach(element => {
		// 	if (element['id'] == req.params.id){
		// 		element["nombre"] = req.body.nombre;
		// 		element["precio"] = req.body.precio;
		// 		element["porcentajeAlcohol"] = req.body.porcentajeAlcohol;
		// 		element["volumen"] = req.body.volumen;
		// 		element["descripcion"] = req.body.descripcion;
		// 	// 	element["imagenes"] = req.body.imagenes;
		// 		element["stock"] = req.body.stock;
		// 		element["descuento"] = req.body.descuento;
		// 		element["oferta"] = req.body.oferta;
		// 		element["importado"] = req.body.importado;
		// 		element["esPack"] = req.body.esPack;
		// 		element["categoria"] = req.body.categoria;
				
		// 	}			
		// });
		res.send (req.body);
	},
	getProductoNuevo: (req,res) => {
		res.render (path.join(__dirname,"../views/productoNuevo"))


		
	},
	// EN PROCESO
	postProductoNuevo: (req,res) => {
		
		console.log(req.body);
		
			let datosProductoNuevo = {

			id : products[products.length - 1].id + 1,
			nombre: req.body.nombre,
            precio: Number(req.body.precio),
            porcentajeAlcohol: Number(req.body.porcentajeAlcohol),
            volumen: req.body.volumen,
            descripcion: req.body.descripcion,
            stock: Number(req.body.stock),
            descuento: Number(req.body.descuento),
            oferta: req.body.oferta == "on" ? oferta = true : oferta = false ,
            importado: req.body.importado == "on" ? importado = true : importado = false ,
            esPack: req.body.esPack == "on" ? esPack = true : esPack = false,
            categoria: req.body.categoria,
			imagenes: req.file ? [req.file.filename] : ['']

			}
			
			
			products.push(datosProductoNuevo); 

			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
	
			res.redirect('/products');
		
    },

	// eliminar producto
	destroy: (req, res) => {

		let filterProducts = products.filter((prod) => prod.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(filterProducts, null, " "));

		res.redirect('/products');
	  },

}
// Acá exportamos el resultado
module.exports = productController;