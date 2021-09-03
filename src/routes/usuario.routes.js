const router = require('express').Router();
const { getUsuario, getByIdUsuario, addUsuario, loginUsuario, updateUsuario, deleteUsuario} = require('../controller/usuario.controller');

router.get('/', getUsuario);
router.get('/:id', getByIdUsuario);
router.post('/', addUsuario);
router.post('/usuario', loginUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;