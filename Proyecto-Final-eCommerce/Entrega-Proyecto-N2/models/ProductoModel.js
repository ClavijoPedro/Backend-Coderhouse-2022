const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    
    name: {type: String, required: true} ,
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    image: {type: String, required: true},
    date: {type: String, required: true},
    code: {type: String, required: true}
});


const ProductoModel = model('producto', ProductoSchema);

module.exports = ProductoModel