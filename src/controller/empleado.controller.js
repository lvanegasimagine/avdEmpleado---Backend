const Empleado = require('../models/Empleado');


const getEmpleado = (async (req, res) => {

    try {
        const empleadoList = await Empleado.find();
     if(!empleadoList){
            res.status(500).json({success: false})
        }
     res.status(200).json({
            ok: true,
            data: empleadoList
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
    }
});

const addEmpleado = (async (req , res)=>{

   try {
       const empleado = new Empleado({
           nombre: req.body.nombre,
           apellido: req.body.apellido,
           cedula: req.body.cedula,
           contacto: req.body.contacto
       })

       const empleadoDB = await empleado.save();

       res.status(200).json({
        status: true,
        data: empleadoDB
    });

   } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
   }
});

module.exports = {
    getEmpleado,
    addEmpleado
}

