//traigo router y defino nombre
const { Router } = require('express');
const productos = Router();


//defino containers metodos productos
const ItemsContainer = require('../../containers/ItemsContainer');
const p = new ItemsContainer('./containers/products.json');


//variable acceso administrador
const admin = true;


//endpoints
productos.get('/:id?', (req, res) => { //lista todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)  
    const id = req.params.id;
    res.send(id ? p.getProdById(id) : p.listAll());
});


productos.post('/', (req, res) => {  //incorporar productos al listado (disponible para administradores) 
    if (admin){
        const product = req.body;
        if(Object.keys(product).length !== 0){
            res.send(p.saveProd(product))
        }else{ throw new Error('error: los capos de producto no pueden estar vacios')}
    }else{
        res.send(`(error 400) ---- La ruta "api/productos" metodo: ${req.method} es solo para administradores`)
    }
});


productos.put('/:id', (req, res) => {  //Actualiza un producto por su id (disponible para administradores) 
    if (admin){
        const id = Number(req.params.id);
        const itemUpdate = req.body;
        res.send(p.updateProdById(id, itemUpdate))
    }else{
        res.send(`(error 400) ---- La ruta "api/productos" metodo: ${req.method} es solo para administradores`);
    }
});


productos.delete('/:id', (req, res) => {  //Borra un producto por su id (disponible para administradores)
    if (admin){
        const itemId = Number(req.params.id)
        res.send(p.deleteProdById(itemId))
    }else{
        res.send(`(error 400) ---- La ruta "api/productos/" metodo: ${req.method} es solo para administradores`)
    }
});


module.exports = productos

