//traigo router de express y defino nombre
const { Router } = require('express');
const carrito = Router();


//defino containers metodos carrito
const CartContainer = require('../../containers/CartContainer')
const c = new CartContainer('./containers/cart.json'); 


//endopoints
carrito.post('/', (req, res) => {  //Crea un carrito y devuelve su id   
    res.send(c.newCart())
});


carrito.delete('/:id', (req, res) => {  //Vacía un carrito y lo elimina 
    const cartId = Number(req.params.id);
    res.send(c.deleteCartById(cartId)) 
});


carrito.get('/:id/productos', (req, res) => {  //lista todos los productos guardados en el carrito 
    const cartId = Number(req.params.id);
    res.send(c.listAllProducts(cartId))
});


carrito.post('/:cartId/productos', (req, res) => {  //incorpora productos al carrito por su id de producto 
    const cartId = Number(req.params.cartId); //traigo el id del carrito de la url
    const prodId = Number(req.body.id); // traigo el id del producto del body (paso un obj producto por postman con post) 
    res.send(c.saveProdInCart(cartId, prodId));
});


carrito.delete('/:id/productos/:id_prod', (req, res) => { //Elimina un producto del carrito por su id de carrito y de producto 
    const cartId = Number(req.params.id)
    const prodId = Number(req.params.id_prod)
    res.send(c.deleteProdById(cartId, prodId))
});


module.exports = carrito