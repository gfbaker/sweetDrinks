// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController');

// Acá definimos las rutas
router.get('/productDetail', productController.getProductDetail);
router.post('/productDetail', productController.postProductDetail);

// Acá exportamos el resultado
module.exports = router;