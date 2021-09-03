const Empleado = require('../models/Empleado');
const mongoose = require('mongoose');


const getEmpleado = (async (req, res) => {
    try {

        const empleadoList = await Empleado.find().populate('area', 'nombre').populate('usuario', ['nombre', 'email']);
        
        if(!empleadoList){
            res.status(500).json({status: false, message: "No hay registro de empleados"})
        }else{
            res.status(200).json({
                status: true,
                data: empleadoList
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
});

const getByIdEmpleado = (async (req , res)=>{

    try {
        // Valida si el id es es el correcto
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Id Invalido');
        }

        const empleadoOne = await Empleado.findById(req.params.id).populate('area', 'nombre');
        
        if(!empleadoOne){
            res.status(500).json({
                status: err,
                success: false
            })
        }
        res.status(200).json({
            status: true,
            data: empleadoOne
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
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
            return res.status(500).send('The empleado cannot be created');

        res.status(200).json({
            status: true,
            data: empleadoDB
        });
    }
    catch (error) {
      res.status(500).json({
             status: false,
             error: error
      });
    }
});

const updateEmpleado =(async (req , res)=>{

    try {
        // Primero valida si el id es el correcto.
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Id Invalido');
        }

        const empleadoAc = await Empleado.findByIdAndUpdate(
            req.params.id,
            {
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
            },
            {new: true}
        )

        res.status(200).json({
           status: true,
           data: empleadoAc
        })
        
    } catch (error) {
       res.status(200).json({
           status: false,
           error: error
      })
    }
});

const deleteEmpleado = (async (req , res)=>{
    // Primero valida si el id es el correcto.
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('ID Invalido');
    }

    Empleado.findByIdAndRemove(req.params.id).then( empleado => {
        if(empleado){
            return res.status(200).json({
                status: true,
                message: 'El empleado ha sido eliminado'
            });
        }else{
            return res.status(400).json({
                status: false,
                message: 'empleado no Encontrado'
            });
        }
    }).catch(err => {
        return res.status(500).json({status: false, error: err});
    })
});

module.exports = {
    getEmpleado,
    getByIdEmpleado,
    addEmpleado,
    updateEmpleado,
    updateEmpleado,
    deleteEmpleado
}

