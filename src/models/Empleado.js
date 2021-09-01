const mongoose = require('mongoose')

const empleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    direccion: {
        type: String,
        required: true,
        min: 4,
        max: 250
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    inss: {
        type: String,
        required: true,
        min: 8,
        max: 8
    },
    estadoCivil: {
        type: String,
        required: true,
    },
    celular: {
        type: String,
        required: true,
        min: 8,
        max: 9
    },
    cedula: {
        type: String,
        required: true,
        min: 14,
        max: 16
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    contacto: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    area: { /// Temporalmente se lo vamos a sugerir
        type: String,
        required: true,
    },
    estudios: {
        type: String,
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    hijos:[],
    laboral: [],
    referencias: [],
    usuario: { /// temporalmente se lo vamos a sugerir
        type: String
    }
},{
    timestamps: true
});

empleadoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
empleadoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Empleado', empleadoSchema)