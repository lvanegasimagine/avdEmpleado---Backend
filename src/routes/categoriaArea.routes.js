const router = require('express').Router();
const { getCategoriaArea,getByIdCategoriaArea, addCategoriaArea, updateCategoriaArea, deleteCategoriaArea} = require('../controller/categoriaArea.controller');
const verifyToken = require('../middleware/validarToken');

router.get('/' , verifyToken, getCategoriaArea);
router.get('/:id', getByIdCategoriaArea);
router.post('/', addCategoriaArea);
router.put('/:id', updateCategoriaArea);
router.delete('/:id', deleteCategoriaArea);

module.exports  = router