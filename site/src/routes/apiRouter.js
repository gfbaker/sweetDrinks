// Express y el router + upload y express-validator
const express = require('express');
const router = express.Router();

// Requer el controller
const apiController = require('../controllers/apiController');

// Rutas 

router.get('/users', apiController.getUsers);
router.get('/users/:id', apiController.getUsersId);

router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductsId);
router.get('/products/:id/images', apiController.getProductsIdImages);

router.get('/topRowData', apiController.topRowData);

// Exportar router
module.exports = router;