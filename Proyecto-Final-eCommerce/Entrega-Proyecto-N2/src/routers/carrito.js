import { Router } from 'express';
import { carrito, productos } from './../daos/index.js'

//instancio router 
const carritoRouter = Router();


//endopoints


//Crea un carrito y devuelve su id
carritoRouter.post('/', async (req, res) => {    
    try{
        const cartId = await carrito.save({productos:[]}); 
        res.status(200).send(cartId);                    
    }catch(err){ console.log(err)};
});



//Vacía un carrito y lo elimina
carritoRouter.delete('/:cart_id', async (req, res) => {   
    const { cart_id } = req.params;
    try{
        await carrito.deleteById(cart_id);
        res.status(200).send('Carrito eliminado');
    }catch(err){ console.log(err)};         
});



//lista productos guardados en el carrito 
carritoRouter.get('/:cart_id/productos', async (req, res) => {   
    const { cart_id } = req.params;
    try{
        const cart = await carrito.listById(cart_id);
        res.status(200).send(cart.productos);
    }catch(err){console.log(err)}; 
});



//incorpora productos al carrito por su id
carritoRouter.post('/:cart_id/productos/:id', async (req, res) => {   
    const { cart_id, id } = req.params;         
    try{
        const cart = await carrito.listById(cart_id); 
        const product = await productos.listById(id);
        cart.productos.push(product);
        await carrito.updateById(cart_id,cart);
        res.status(201).send('Producto agregado'); 
    }catch(err){console.log(err)}; 
});



 //Elimina un producto del carrito por su id de carrito y de producto
carritoRouter.delete('/:cart_id/productos/:id', async (req, res) => { 
    const {cart_id, id} = req.params
    try{
        const cart = await carrito.listById(cart_id);
        const products = cart.productos.filter(itm => itm.id != id);  
        cart.productos = products;
        await carrito.updateById(cart_id, cart);   
        res.status(200).send('Producto eliminado')    
    }catch(err){console.log(err)}  
});
 

export default carritoRouter