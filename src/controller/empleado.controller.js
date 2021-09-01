const Empleado = require('../models/Empleado');
const mongoose = require('mongoose');


const getEmpleado = (async (req, res) => {
    try {

        const empleadoList = await Empleado.find();
        
        if(!empleadoList){
            res.status(500).json({status: false, message: "No hay registro de empleados"})
        }else{
            res.status(200).json({
                ok: true,
                data: empleadoList
            });
        }
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
    }
});

const getByIdEmpleado = (async (req , res)=>{

    try {
        // Valida si el id es es el correcto
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Invalid Product Id');
        }

        const empleadoOne = await Empleado.findById(req.params.id);
        
        if(!empleadoOne){
            res.status(500).json({
                error: err,
                success: false
            })
        }
        res.send(empleadoOne);
    

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
    }
});

const addEmpleado = (async (req , res)=>{
    
    const existeEmail = await Empleado.findOne({email: req.body.email});

    if(existeEmail) return res.status(400).json({status: true, message: 'Email ya registrado'});

    try {

        const empleado = new Empleado({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            fechaNacimiento: req.body.fechaNacimiento,
            inss: req.body.inss,
            estadoCivil: req.body.estadoCivil,
            celular: req.body.celular,
            cedula: req.body.cedula,
            email: req.body.email,
            contacto: req.body.contacto,
            area: req.body.area,
            estudios: req.body.estudios,
            fechaInicio: req.body.fechaInicio,
            hijos: req.body.hijos,
            laboral: req.body.laboral,
            referencias: req.body.referencias,
            usuario: req.body.usuario,
        })

        const empleadoDB = await empleado.save();

        if(!empleadoDB)
            return res.status(500).send('The product cannot be created');

        res.status(200).json({
         status: true,
         data: empleadoDB
     });
    }
    catch (error) {
      res.status(500).json({
             ok: false,
             error: error
      });
    }
});

const updateEmpleado = (req , res)=>{
    try {
        res.status(200).json({
           id: req.params.id
        })
        
    } catch (error) {
       res.status(200).json({
         error: error
      })
    }
}

const deleteEmpleado = (req , res)=>{
    try {
        res.status(200).json({
           id: req.params.id
        })
        
    } catch (error) {
       res.status(200).json({
         error: error
      })
    }
}

module.exports = {
    getEmpleado,
    getByIdEmpleado,
    addEmpleado,
    updateEmpleado,
    updateEmpleado,
    deleteEmpleado
}

