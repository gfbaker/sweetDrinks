// Acá nos falta nuestra fuente de datos
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const { formatWithOptions } = require('util');
const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

// al hacer el requiere asignado a db no hace falta aclararle el nombre del archivo (index.js) dado que éste es el archivo default.
const db = require('../database/models');
//No hace falta traer el modelo, con solo traer DB alcanza, Sequelize se encarga de hacer la relación.

// Acá nos falta un objeto literal con las acciones para cada ruta
const productController = {

	getProducts: (req,res) => {
		categoria = req.params.categoria;
		console.log(categoria)
		if (categoria == undefined){
			categoria = "Todos los productos"; 

			db.Products
				.findAll({
					include:[{association: "images"},{association: "categories"}]
				})
				.then(function(resultado){
					// res.send (resultado)
					res.render (path.join(__dirname,"../views/products"),{productsToShow: resultado, categoria});
				})
				.catch(function(error){
					console.log(error)
				});			
		}
	else{
			// db.Categories
			// .findAll({
			// 	include:[{association: "products", nested: true }],
			// 	// where: {id: categoria}
			// 	// right: true
			// })
			// .then(function(resultado){
			// 	res.send (resultado)
			// 	// res.send (resultado[0].products)
			// 	// res.render (path.join(__dirname,"../views/products"),{productsToShow: resultado[0].products, categoria});
			// })
			// .catch(function(error){
			// 	console.log(error)
			// });	
			db.Products
			.findAll({
				include:[{association: "images"},{association: "categories"}],
				where: {
					'$categories.id$': categoria
				}
			})
			.then(function(resultado){
				// res.send (resultado)
				res.render (path.join(__dirname,"../views/products"),{productsToShow: resultado, categoria});
			})
			.catch(function(error){
				console.log(error)
			});
		}


    },


    getProductDetail: (req,res) => {
		db.Products
		.findOne({
			include:[{association: "images"},{association: "categories"}],
			where: {
				id: req.params.id
			}
		})
		.then(function(resultado){
			// res.send (resultado)
			res.render (path.join(__dirname,"../views/productDetail"),{product: resultado});
		})
		.catch(function(error){
			console.log(error)
		});

    },

    postProductDetail: (req,res) => {res.redirect('/');},

    // Update - Form to edit
	edit: (req, res) => {

		db.Products
		.findOne({
			include:[{association: "images"},{association: "categories"}],
			where: {
				id: req.params.id
			}
		})
		.then(function(resultado){
			// res.send (resultado)
			res.render (path.join(__dirname,"../views/productEditForm"),{ productToEdit: resultado});
		})
		.catch(function(error){
			console.log(error)
		});



	},
	// Update - Method to update

	update: (req, res) => {
		let errors = validationResult(req)

        if(errors.isEmpty()){
			// let imagenes = req.file != undefined ? [req.file.filename] : []
			db.Categories
			.findAll({
				where: {tipo: req.body.categoria}
			})
			.then(function(resultado){
				let productoEditado = {
					nombre: req.body.nombre.toUpperCase(),
					precio:  Number(req.body.precio),
					porcentajeAlcohol: Number(req.body.porcentajeAlcohol),
					volumen: req.body.volumen,
					descripcion: req.body.descripcion,
					// images: req.file != undefined ? [req.file.filename] : [],
					stock: Number(req.body.stock),
					descuento: Number(req.body.descuento),
					oferta: (req.body.oferta === "true"),
					importado: (req.body.importado === "true"),
					esPack: (req.body.esPack === "true"),
					categoria_id: resultado
				}

				// res.send (productoEditado)

				db.Products
				.update(
					productoEditado,
					{
					where: 
						{
						id: req.params.id	
						}
					}
				)
				
			
			})
			.then(function(resultado){
				// res.send (resultado)
				res.render (path.join(__dirname,"../views/productEditForm"),{ productToEdit: resultado});
			})
			.catch(function(error){
				console.log(error)
			});	


			
			// db.Products
			// .update(
			// 	productoEditado,
			// 	{
			// 	where: 
			// 		{
			// 		id: req.params.id	
			// 		}
			// 	}
			// )
			// .then(function(resultado){
			// 	// res.send (resultado)
			// 	res.render (path.join(__dirname,"../views/productEditForm"),{ productToEdit: resultado});
			// })
			// .catch(function(error){
			// 	console.log(error)
			// });

			// res.redirect('/');
		}else{
			res.render('productEditForm',{errors:errors.array()});
		}

	},
	getNewProduct: (req,res) => {
		res.render (path.join(__dirname,"../views/newProduct"))


		
	},
	// Method Post
	postNewProduct: (req,res) => {
		
		let errors = validationResult(req)
       
        if(errors.isEmpty()){
		
			let datosNewProduct = {

			id : products[products.length - 1].id + 1,
			nombre: req.body.nombre.toUpperCase(),
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
			
			
			products.push(datosNewProduct); 

			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
	
			res.redirect('/products');

		}else{
			res.render('newProduct',{errors:errors.array()});
		  }
		
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