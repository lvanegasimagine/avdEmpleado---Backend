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


module.exports = {
    getCategoriaArea
}