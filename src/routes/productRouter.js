// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController');



// Acá definimos las rutas

router.get('/:categoria?', productController.getProducts);

router.get('/detail/:id', productController.getProductDetail);
router.post('/', productController.postProductDetail);

router.get('/:id/edit', productController.edit); 
router.put('/', productController.update); 

// Acá exportamos el resultado
module.exports = router;