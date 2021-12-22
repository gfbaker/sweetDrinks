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
		if (categoria == undefined){
			productsToShow = products;
			categoria = "Todos los productos"; 
		}else{
			productsToShow = products.filter (function (product){
				return product.categoria.toUpperCase() == categoria.toUpperCase();
			})
			categoria = categoria.toUpperCase();
		}
		res.render (path.join(__dirname,"../views/products"),{productsToShow, categoria});
		// db.Users
		// .findAll({
		// 	include:[{association: "usersAuthData"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })

		// db.Products
		// .findAll({
		// 	include:[{association: "categories"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })
		// db.Products
		// .findAll({
		// 	include:[{association: "images"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })

		// db.Users
		// .findAll({
		// 	include:[{association: "carts"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })

		// db.CartDetails
		// .findAll({
		// 	include:[{association: "carts"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })

		// db.Products
		// .findAll({
		// 	include:[{association: "cartDetails"}]
		// })
		// .then(function(resultado){
		// 	res.send(resultado)
		// })
		// .catch(function(error){
		// 	console.log(error)
		// })

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
		let errors = validationResult(req)
       
        if(errors.isEmpty()){

		products.forEach(element => {
			if (element['id'] == req.params.id){
				element["nombre"] = req.body.nombre.toUpperCase();
				element["precio"] = Number(req.body.precio);
				element["porcentajeAlcohol"] = Number(req.body.porcentajeAlcohol);
				element["volumen"] = req.body.volumen;
				element["descripcion"] = req.body.descripcion;
				req.file != undefined ? element["imagenes"] = [req.file.filename] :
				element["stock"] = Number(req.body.stock);
				element["descuento"] = Number(req.body.descuento);
				req.body.oferta == "on" ? element["oferta"] = true : element["oferta"] = false ;
				req.body.importado == "on" ? element["importado"] = true : element["importado"] = false ;
				req.body.esPack == "on" ? element["esPack"] = true : element["esPack"] = false ;
				element["categoria"] = req.body.categoria;
				
			}			
		});

		fs.writeFileSync(productsFilePath,JSON.stringify(products))

		res.redirect('/');
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