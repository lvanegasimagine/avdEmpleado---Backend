const mongoose = require('mongoose')

const empleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    empleos: [{ type: mongoose.Schema.ObjectId, ref: "Empleos"}],
});

module.exports = mongoose.model('Empleado', empleadoSchema)