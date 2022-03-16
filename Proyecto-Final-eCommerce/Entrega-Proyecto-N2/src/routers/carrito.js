//traigo router de express y defino nombre
const { Router } = require('express');
const carrito = Router();


//definir containers metodos carrito



//endopoints
carrito.post('/', (req, res) => {  //Crea un carrito y devuelve su id   
    res.send()
});


carrito.delete('/:id', (req, res) => {  //Vacía un carrito y lo elimina 
    res.send() 
});


carrito.get('/:id/productos', (req, res) => {  //lista todos los productos guardados en el carrito 
    
    res.send()
});


carrito.post('/:cartId/productos', (req, res) => {  //incorpora productos al carrito por su id de producto 
    res.send();
});


carrito.delete('/:id/productos/:id_prod', (req, res) => { //Elimina un producto del carrito por su id de carrito y de producto 
    res.send()
});


module.exports = carrito