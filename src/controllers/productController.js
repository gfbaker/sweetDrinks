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
const { send } = require('process');
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

	update: async (req, res) => {
		let errors = validationResult(req)


        if(errors.isEmpty()){

			try{ 
                productToEdit = await db.Products.findByPk(req.params.id);
				
				oldCategory = await productToEdit.getCategories()

				if (oldCategory.tipo != req.body.categoria ){
					categoria = await db.Categories
					.findOne({
						where: {tipo: req.body.categoria}
					})
					// console.log(categoria)
					productToEdit.categoria_id = categoria.id	

				}

					productToEdit.nombre =  req.body.nombre.toUpperCase()
					productToEdit.precio =   Number(req.body.precio)
					productToEdit.porcentajeAlcohol =  Number(req.body.porcentajeAlcohol)
					productToEdit.volumen = req.body.volumen
					productToEdit.descripcion = req.body.descripcion
					productToEdit.stock = Number(req.body.stock)
					productToEdit.descuento = Number(req.body.descuento)
					productToEdit.oferta = (req.body.oferta === "true")
					productToEdit.importado = (req.body.importado === "true")
					productToEdit.esPack = (req.body.esPack === "true")

					if(req.files.length != 0){
						let filesname = req.files.map(function(image){
							return {nombre: image.filename};
						})

						let savedImages = await db.Images.bulkCreate(filesname)
						// console.log (savedImages)

						await productToEdit.setImages(savedImages);
					}

					productToEdit.save()
					res.redirect('/products/detail/'+req.params.id)



			
			} catch(error){
                console.log(error);
            }

			// categoria = await db.Categories
			// .findOne({
			// 	where: {tipo: req.body.categoria}
			// })


			// let nuevosDatos = {
			// 	nombre: req.body.nombre.toUpperCase(),
			// 	precio:  Number(req.body.precio),
			// 	porcentajeAlcohol: Number(req.body.porcentajeAlcohol),
			// 	volumen: req.body.volumen,
			// 	descripcion: req.body.descripcion,
			// 	stock: Number(req.body.stock),
			// 	descuento: Number(req.body.descuento),
			// 	oferta: (req.body.oferta === "true"),
			// 	importado: (req.body.importado === "true"),
			// 	esPack: (req.body.esPack === "true"),
			// 	categoria_id: categoria.id
			// }


			// db.Products
			// .update(
			// 	nuevosDatos,
			// 	{
			// 	where: 
			// 		{
			// 		id: req.params.id	
			// 		}
			// 	}
			// )
			// .then( () =>{
			// 	if(req.files.length == 0){
			// 		//Si no se cambiaron las imagenes, ya no hay nada más para hacer
			// 		res.redirect('/products/detail/'+req.params.id);

			// 	}else{
			// 		//si se cambiaron las imagenes
			// 		//Borrar imagenes anteriores
			// 		db.Images.destroy({
			// 			where: {product_id: req.params.id}
			// 		 });
			// 		//agregar nuevas imagenes
					
			// 		req.files.forEach(async file =>{
			// 			// console.log(file['filename'])
			// 			await db.Images.create({
			// 				nombre: file['filename'],
			// 				product_id: req.params.id
			// 			})
			// 		})
			// 		//redireccionar
			// 		res.redirect('/products/detail/'+req.params.id);
			// 	}
				


			// })
			// .catch( e=>{
			// 	console.log(e)
			// })


			

			// // 	.then(function(resultado){
			// // 		// res.send (resultado)
					
			// // 	})
			// // 	.catch(function(error){
			// // 		console.log(error)
			// // 	});	
			// // // res.render (path.join(__dirname,"../views/productEditForm"),{ productToEdit: resultado});
			// // // res.redirect('/');
		}else{
			res.render('productEditForm',{errors:errors.array()});
		}

	},
	getNewProduct: (req,res) => {
		res.render (path.join(__dirname,"../views/newProduct"))

	},

	// Method Post
	postNewProduct: async (req,res) => {
		
		let errors = validationResult(req)


		if(errors.isEmpty()){

			categoria = await db.Categories
			.findOne({
				where: {tipo: req.body.categoria}
			})


			productoCreado = await db.Products.create({
				nombre: req.body.nombre.toUpperCase(),
				precio: Number(req.body.precio),
				porcentajeAlcohol: Number(req.body.porcentajeAlcohol),
				volumen: req.body.volumen,
				descripcion: req.body.descripcion,
				stock: Number(req.body.stock),
				descuento: Number(req.body.descuento),
				oferta: (req.body.oferta === "true"),
				importado: (req.body.importado === "true"),
				esPack: (req.body.esPack === "true"),
				categoria_id: categoria.id
			})


			if (req.files != []){

				for (i = 0 ; i < req.files.length; i++){
					db.Images.create({
						nombre: req.files[i]['filename'],
						product_id: productoCreado.id
					})
					.then (resultado =>{
						console.log (resultado)
					})
					.catch (error => {
						console.log(error)
					})
				}
			}
			res.redirect('/products');

		}else{
			res.render('newProduct',{errors:errors.array()});
		}
		
    },

	// eliminar producto
	destroy: async (req, res) => {
		let id = Number(req.params.id)
		await db.Images.destroy({
            where: {product_id: id}
         })

		await db.Products.destroy({
            where: {id: id}	
         });

		res.redirect('/products');
	  },

}
// Acá exportamos el resultado
module.exports = productController;