const mongoose = require('mongoose')

const categoriaArea = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 4,
        max: 20
    }
})

categoriaArea.virtual('id').get(function() {
    return this._id.toHexString();
});
categoriaArea.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('CategoriaArea', categoriaArea);