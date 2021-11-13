// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const mainController = require('../controllers/mainController');

// Acá definimos las rutas
router.get('/', mainController.getIndex);
router.get('/cart', mainController.getCart);
router.post('/cart', mainController.postCart);

router.get('/confirmation', mainController.getConfirmation);
router.post('/confirmation', mainController.postConfirmation);

router.get('/login', mainController.getLogin);
router.post('/login', mainController.postLogin);

router.get('/newUser', mainController.getNewUser);
router.post('/newUser', mainController.getNewUser);


 

// Acá exportamos el resultado
module.exports = router;