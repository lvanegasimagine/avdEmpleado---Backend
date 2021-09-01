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
    empleos: [],
});

empleadoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
empleadoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Empleado', empleadoSchema)