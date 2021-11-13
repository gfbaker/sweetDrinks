// Acá nos falta express y el router
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload')

// Aća nos falta traer el controller
const productController = require('../controllers/productController');

// Acá definimos las rutas

router.get('/detail/:id', productController.getProductDetail);
router.post('/', productController.postProductDetail);

router.get('/:id/edit', productController.edit); 
router.put('/:id',upload.single("imagenes"), productController.update); 

// Eliminar Producto
router.delete('/detail/:id', productController.destroy);

// Producto Nuevo
router.get('/newProduct', productController.getNewProduct);
router.post('/newProduct', upload.single('imagenes'), productController.postNewProduct);

router.get('/:categoria?', productController.getProducts);

// Acá exportamos el resultado
module.exports = router; 