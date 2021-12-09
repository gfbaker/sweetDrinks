// Acá nos falta express y el router
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload')
const { check } = require('express-validator');
const isUserLoggedIn = require('../../middlewares/isUserLoggedIn')
const guestMiddleware = require('../../middlewares/guestMiddleware')
const isAdminMiddleware = require('../../middlewares/isAdminMiddleware')

// Aća nos falta traer el controller
const productController = require('../controllers/productController');

const validateForm = [
    check('nombre')
    .notEmpty().withMessage('Debes completar el nombre'),
    check('precio')
    .notEmpty().withMessage('Debes completar el precio')
    .bail()
    .isNumeric(),
    check('porcentajeAlcohol')
    .notEmpty().withMessage('Debes indicar el porcentaje de alcohol')
    .bail()
    .isNumeric()
    .isLength({ min: 0, max: 100 }),
    check('volumen')
    .notEmpty().withMessage('Debes indicar el volumen'),
    check('descripcion')
    .notEmpty().withMessage('Debes agregar una descripción'),
    check('stock')
    .notEmpty().withMessage('Debes indicar el stock')
    .bail()
    .isNumeric(),
    check('descuento')
    .notEmpty().withMessage('Debes indicar el porcentaje de descuento')
    .bail()
    .isNumeric()
    .isLength({ min: 0, max: 100 }),
    check('categoria')
    .notEmpty().withMessage('Debes seleccionar una categoría')

    ]



// Acá definimos las rutas

router.get('/detail/:id', productController.getProductDetail);
router.post('/', productController.postProductDetail);

router.get('/:id/edit', isUserLoggedIn, isAdminMiddleware, productController.edit); 
router.put('/:id',upload.single("imagenes"), validateForm, productController.update); 

// Eliminar Producto
router.delete('/detail/:id', isUserLoggedIn, isAdminMiddleware, productController.destroy);

// Producto Nuevo
router.get('/newProduct', isUserLoggedIn, isAdminMiddleware, productController.getNewProduct);
router.post('/newProduct', upload.single('imagenes'), validateForm, productController.postNewProduct);

router.get('/:categoria?', productController.getProducts);

// Acá exportamos el resultado
module.exports = router; 