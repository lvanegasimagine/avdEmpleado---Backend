const mongoose = require('mongoose');
const CategoriaArea = require('../models/CategoriaArea');

const getCategoriaArea = (async (req,res) => {
    try {
        const categoriaAreaList = await CategoriaArea.find();

        if(!categoriaAreaList){
            res.status(500).json({status:false, message: "Listado de categoria vacio"})
        }

        res.status(200).json({
            status: true,
            data: categoriaAreaList
        })

    } catch (error) {
        res.status(500).json({
            status:false, 
            error: error
        });
    }
});


const getByIdCategoriaArea = (async (req , res)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Id invalido');
        }

        const categoriaAreaOne = await CategoriaArea.findById(req.params.id);

        if(!categoriaAreaOne){
            return res.status(500).json({status: false, message: 'No existe este registro'})
        }

        res.status(200).json({
            status: true,
            data: categoriaAreaOne
        })
    }
    catch(error){
        res.status(500).json({
            status: false,
            error: error
        })
    }
});

const addCategoriaArea = (async (req,res) => {
    const existeNombre = await CategoriaArea.findOne({nombre: req.body.nombre});

    if(existeNombre) return res.status(400).json({status: true, message: 'Categoria ya existe!'})

    try {
        const categoriaAreaRegistro = new CategoriaArea({
            nombre: req.body.nombre
        });

        const categoriaAreaDB = await categoriaAreaRegistro.save();

        res.status(200).json({
            status: true,
            data: categoriaAreaDB
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        })
    }
});


module.exports = {
    getCategoriaArea,
    getByIdCategoriaArea,
    addCategoriaArea
}