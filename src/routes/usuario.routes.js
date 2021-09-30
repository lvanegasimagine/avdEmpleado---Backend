const router = require('express').Router();
const { check } = require('express-validator');
const { listUsuario, addUsuario, loginUsuario, revalidarToken } = require('../controller/usuario.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');

router.get('/', listUsuario);

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], addUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;