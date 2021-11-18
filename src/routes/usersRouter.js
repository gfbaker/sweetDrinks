// Express y el router + upload y express-validator
const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadProfileImg')
const { check } = require('express-validator');

// Requer el controller
const usersController = require('../controllers/usersController');

const validateUserForm =[];

// Rutas 
router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

router.get('/newUser', usersController.getNewUser);
router.post('/newUser', upload.single('imagen'), usersController.postNewUser);

router.get('/user/:id', usersController.getUserProfile);

// Faltaria ruta para editar usuario
router.delete('/user/:id', usersController.destroyUser);



// Exportar router
module.exports = router;