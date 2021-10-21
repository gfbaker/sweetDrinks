// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const mainController = require('../controllers/mainController');

// Acá definimos las rutas
router.get('/', mainController.getIndex);
router.get('/carrito1', mainController.getCarrito1);
router.post('/carrito1', mainController.postCarrito1);

router.get('/carrito2', mainController.getCarrito2);
router.post('/carrito2', mainController.postCarrito2);

router.get('/login', mainController.getLogin);
router.post('/login', mainController.postLogin);

router.get('/registro', mainController.getRegistro);
router.post('/registro', mainController.postRegistro);



// Acá exportamos el resultado
module.exports = router;