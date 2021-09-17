const router = require('express').Router();
const { getEmpleado, getByIdEmpleado, addEmpleado, updateEmpleado, deleteEmpleado } = require('../controller/empleado.controller');
const verifyToken = require('../middleware/validarToken');

router.get('/', verifyToken, getEmpleado)
router.get('/:id', getByIdEmpleado)
router.post('/', addEmpleado)
router.put('/:id', updateEmpleado)
router.delete('/:id', deleteEmpleado)


module.exports = router;