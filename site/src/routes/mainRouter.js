// Acá nos falta express y el router
const express = require('express');
const router = express.Router();
const isUserLoggedIn = require('../../middlewares/isUserLoggedIn')
const guestMiddleware = require('../../middlewares/guestMiddleware')

// Aća nos falta traer el controller
const mainController = require('../controllers/mainController');

// Acá definimos las rutas
router.get('/', mainController.getIndex);
router.get('/cart',  isUserLoggedIn, mainController.getCart);
router.post('/cart', mainController.postCart);

router.get('/confirmation', isUserLoggedIn, mainController.getConfirmation);
router.post('/confirmation', mainController.postConfirmation);




 

// Acá exportamos el resultado
module.exports = router;