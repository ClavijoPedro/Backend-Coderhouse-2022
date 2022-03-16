const { Schema, model } = require('mongoose');

const CarritoSchema = new Schema({
    
    date: Date,
    products:[]
        
});

const CarritoModel = model('carrito', CarritoSchema);

module.exports = CarritoModel;