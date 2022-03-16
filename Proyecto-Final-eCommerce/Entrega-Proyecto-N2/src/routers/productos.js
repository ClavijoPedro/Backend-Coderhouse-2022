//traigo router y defino nombre
const { Router } = require('express');
const productos = Router();


//definir containers metodos productos



//variable acceso administrador
const admin = true;


//endpoints
productos.get('/:id?', (req, res) => { //lista todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)  
    res.send();
});


productos.post('/', (req, res) => {  //incorporar productos al listado (disponible para administradores) 
    res.send()
});


productos.put('/:id', (req, res) => {  //Actualiza un producto por su id (disponible para administradores) 
    res.send();
});


productos.delete('/:id', (req, res) => {  //Borra un producto por su id (disponible para administradores)
    res.send()
    
});


module.exports = productos

