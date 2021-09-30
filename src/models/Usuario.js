const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 10,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20
    },
    direccion: {
        type: String,
        required: true,
        min: 8,
        max: 250
    },
    departamento: {
        type: String,
        required: true,
        min: 4,
        max: 25
    },
    celular: {
        type: String,
        required: true,
        min: 8,
        max: 9
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
},{
    timestamps: true
});

usuarioSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

usuarioSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Usuario', usuarioSchema)
