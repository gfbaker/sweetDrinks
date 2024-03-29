// Express y el router + upload y express-validator
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadProfileImg')
const isUserLoggedIn = require('../../middlewares/isUserLoggedIn')
const guestMiddleware = require('../../middlewares/guestMiddleware')
const isAdminMiddleware= require('../../middlewares/isAdminMiddleware')
const { check } = require('express-validator');
guestMiddleware
// Requer el controller
const usersController = require('../controllers/usersController');

const validateUserForm =[
    check('nombre')
    .notEmpty().withMessage('Debes completar con tu nombre'),
    check('apellido')
    .notEmpty().withMessage('Debes completar con tu apellido'),
    check('email')
    .notEmpty().withMessage('Ingresa tu E-mail')
    .bail()
    .isEmail().withMessage('Debe ser un E-mail válido'),
    check('contrasenia')
    .notEmpty().withMessage('Debes completar tu contraseña')
    .bail()
    .isLength({ min: 8}).withMessage('Tu contraseña debe tener mínimo 8 carácteres'),
    check('telefono')
    .notEmpty().withMessage('Debes completar tu teléfono')
    .bail()
    .isNumeric().withMessage('Ingresa un número de teléfono válido'),
   

];
const validateUserFormLogin =[
    check('email')
    .notEmpty().withMessage('Ingresa tu E-mail'),
    check('contrasenia')
    .notEmpty().withMessage('Debes completar tu contraseña'),
]

// Rutas 
router.get('/login', guestMiddleware, usersController.getLogin);
router.post('/login',validateUserFormLogin, usersController.postLogin);

router.get('/usersList', isUserLoggedIn, isAdminMiddleware, usersController.getUsersList);

router.get('/newUser', guestMiddleware, usersController.getNewUser);
router.post('/newUser', upload.single('imagen'),validateUserForm, usersController.postNewUser);

router.get('/user/:id_user', isUserLoggedIn, usersController.getUserProfile);

router.get('/user/:id_user/edit',  isUserLoggedIn, usersController.editUser);
router.put('/user/:id_user/edit', upload.single("imagen"), validateUserForm, usersController.updateUser);

router.delete('/user/:id_user', usersController.destroyUser);

router.get('/endSession', usersController.endSession);

// Exportar router
module.exports = router;