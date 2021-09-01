const router = require('express').Router();
const {getEmpleado, addEmpleado} = require('../controller/empleado.controller');

router.get('/', getEmpleado)
router.post('/', addEmpleado)
// router.get('/list', getEmpleado)

module.exports = router;