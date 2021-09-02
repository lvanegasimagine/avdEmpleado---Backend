const router = require('express').Router();
const { getCategoriaArea,getByIdCategoriaArea, addCategoriaArea } = require('../controller/categoriaArea.controller');

router.get('/' , getCategoriaArea);
router.get('/:id', getByIdCategoriaArea);
router.post('/', addCategoriaArea);
// router.put('/:id', updateCategoriaArea);
// router.delete('/:id', deleteCategoriaArea);

module.exports  = router