const router = require('express').Router();
const { getUsuario} = require('../controller/usuario.controller');

router.get('/', getUsuario);
// router.get('/:id', getByIdUsuario);
// router.post('/', addUsuario);
// router.put('/:id', updateUsuario);
// router.delete('/:id', deleteUsuario);

module.exports = router;