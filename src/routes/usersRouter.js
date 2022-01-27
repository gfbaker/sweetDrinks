// Express y el router + upload y express-validator
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadProfileImg')
const isUserLoggedIn = require('../../middlewares/isUserLoggedIn')
const guestMiddleware = require('../../middlewares/guestMiddleware')
const isAdminMiddleware= require('../../middlewares/isAdminMiddleware')
const { check } = require('express-validator');
const fetch = require('node-fetch')


// Requer el controller
const usersController = require('../controllers/usersController');
const res = require('express/lib/response');

const validateUserForm =[
    check('nombre')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({ min: 2 }).withMessage('Tu nombre debe ser más extenso'),
    check('apellido')
        .notEmpty().withMessage('Debes completar con tu apellido').bail()
        .isLength({ min: 2 }).withMessage('Tu apellido debe ser más extenso'),
    check('email')
        .notEmpty().withMessage('Ingresa tu E-mail').bail()
        .isEmail().withMessage('Debe ser un E-mail válido'),
    check('contrasenia')
        .notEmpty().withMessage('Debes completar tu contraseña').bail()
        .isLength({ min: 8}).withMessage('Tu contraseña debe tener mínimo 8 carácteres').bail()
        .custom( passwd => {
            let regex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
            return regex.test(passwd);
        }).withMessage('La contraseña debe incluir mayúscula, minúscula, número y caracter especial').bail()
        .custom(() => {
            if (req.body.contrasenia === req.body.confContr) {
                return true;
            } else {
                return false;
            }
        })
        .withMessage('Las contraseñas no coinciden'), 
    check('telefono')
        .notEmpty().withMessage('Debes completar tu teléfono').bail()
        .isNumeric().withMessage('Ingresa un número de teléfono válido'),
    check('imagen')
        .custom( image => {
            if (image) return (image.mimetype == "image/png" || image.mimetype == "image/jpg" || image.mimetype == "image/jpeg");
            }).withMessage("Solo se permite formato .png, .jpg y .jpeg"),
   

];
const validateUserFormLogin =[
    check('email')
        .notEmpty().withMessage('Ingresa tu E-mail').bail()
        .isEmail().withMessage('Debe ser un E-mail válido')
        .custom( email => {
            let data = {
                "email": email
            }
            console.log(JSON.stringify(data))

            fetch("http://localhost:3080/userExists", {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(isUserinDB => {
                  console.log("#####################################################")
                  console.log (isUserinDB)
                  console.log (isUserinDB === "true")
                  return (isUserinDB === "true")

                });
        }).withMessage("Email inválido"),
    check('contrasenia')
    .notEmpty().withMessage('Debes completar tu contraseña'),
    // .custom( async contraseña => {
    //     let passwdMatch = await fetch("http://localhost:3080/passwordMatch",{
    //         method: 'post',
    //         body: JSON.stringify({
    //             "contrasenia": `${contraseña}`
    //         }),
    //         headers: {'Content-Type': 'application/json'}
    //     })

    //     return (passwdMatch === "true")
    // }).withMessage("Contraseña inválida"),
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

router.post('/userExists', usersController.userExists);

router.get('/prueba', usersController.prueba);

// Exportar router
module.exports = router;