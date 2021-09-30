const router = require('express').Router();
const { check } = require('express-validator');
const { crearUsuario } = require('../controller/usuario.controller');
const { validarCampos } = require('../middlewares/validarCampos');



router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], crearUsuario);


module.exports = router;