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
router.put('/:id',upload.single("imagenesProductos[]"), productController.update); 

// Eliminar Producto
router.delete('/detail/:id', productController.destroy);

// Producto Nuevo
router.get('/productoNuevo', productController.getProductoNuevo);
router.post('/productoNuevo', upload.single('imagenes'), productController.postProductoNuevo);

router.get('/:categoria?', productController.getProducts);

// Acá exportamos el resultado
module.exports = router;