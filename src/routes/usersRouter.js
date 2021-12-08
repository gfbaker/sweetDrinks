// Express y el router + upload y express-validator
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadProfileImg')
const { check } = require('express-validator');

// Requer el controller
const usersController = require('../controllers/usersController');

const validateUserForm =[
    check('nombre')
    .notEmpty().withMessage('Debes completar con tu nombre'),
    check('apellido')
    .notEmpty().withMessage('Debes completar con tu apellido'),
    check('usuario')
    .notEmpty().withMessage('No olvides completar tu usuario')
    .isLength({ min: 0, max: 8 }).withMessage('El nombre de Usuario debe tener como máximo 8 carácteres'),
    check('email')
    .notEmpty().withMessage('Ingresa tu E-mail')
    .isEmail().withMessage('Debe ser un E-mail válido'),
    check('contrasenia')
    .notEmpty().withMessage('Debes completar tu contraseña')
    .isLength({ min: 8}).withMessage('Tu contraseña debe tener mínimo 8 carácteres'),
    check('telefono')
    .notEmpty().withMessage('No olvides ingresar tu número de teléfono')
    .isNumeric().withMessage('Ingresa un número de teléfono válido'),
   

];
const validateUserFormLogin =[
    check('email')
    .notEmpty().withMessage('Ingresa tu E-mail'),
    check('contrasenia')
    .notEmpty().withMessage('Debes completar tu contraseña'),
]

// Rutas 
router.get('/login', usersController.getLogin);
router.post('/login',validateUserFormLogin, usersController.postLogin);

router.get('/newUser', usersController.getNewUser);
router.post('/newUser', upload.single('imagen'),validateUserForm, usersController.postNewUser);

router.get('/user/:id', usersController.getUserProfile);

// Faltaria ruta para editar usuario
router.delete('/user/:id', usersController.destroyUser);

router.get('/endSession', usersController.endSession);

// Exportar router
module.exports = router;