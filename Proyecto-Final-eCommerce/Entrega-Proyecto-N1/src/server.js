const express = require('express');
const { Router } = express;



//defino app y routers
const app = express();
const productos = Router();
const carrito = Router();


//defino containers productos y carrito
const ItemsContainer = require('../containers/ItemsContainer');
const CartContainer = require('../containers/CartContainer')
const p = new ItemsContainer('./containers/products.json');
const c = new CartContainer('./containers/cart.json'); 



//middleware a nivel ruta para validacion administrador
function adminMW (req, res, next) {
    const pass = true; //iria el pass
    const adminPass = true; //iria req.body.adminPass
    adminPass === pass ? next() 
    :res.status(403).send(`(error 403) ---- La ruta "api/productos" metodo Post es solo para administradores`);   
}



//endpoints router productos
productos.get('/:id?', (req, res) => { //lista todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)  
    const id = req.params.id;
    res.send(id ? p.getById(id) : p.listAll());
});


productos.post('/', adminMW, (req, res) => {  //incorporar productos al listado regulado x middleware admin(disponible para administradores) 
    const product = req.body;
    res.send(p.save(product))
});


productos.put('/:id', adminMW, (req, res) => {  //Actualiza un producto por su id (disponible para administradores) 
    const id = Number(req.params.id);
    const itemUpdate = req.body;
    res.send(p.updateById(id, itemUpdate))
});


productos.delete('/:id', adminMW, (req, res) => {  //Borra un producto por su id (disponible para administradores) 
    const itemId = Number(req.params.id)
    res.send(p.deleteById(itemId))
});


//----------------------------------------------------------------------------------------------------------------------------


//endpoints router carrito
carrito.post('/', (req, res) => {  //Crea un carrito y devuelve su id   
    res.send(c.newCart())
});


carrito.delete('/:id', (req, res) => {  //Vacía un carrito y lo elimina 
    const cartId = Number(req.params.id);
    res.send(c.deleteById(cartId))
});


carrito.get('/:id/productos', (req, res) => {  //lista todos los productos guardados en el carrito 
    const cartId = Number(req.params.id);
    res.send(c.listAllProducts(cartId))
});


carrito.post('/:id/productos', (req, res) => {  //incorpora productos al carrito por su id de producto 
    const cartId = Number(req.params.id); //traigo el id del carrito de la url
    const prodId = Number(req.body.id); // traigo el id del producto del body (paso un obj producto por postman con post) 
    res.send(c.saveInCart(cartId, prodId));
});


carrito.delete('/:id/productos/:id_prod', (req, res) => { //Elimina un producto del carrito por su id de carrito y de producto 
    const cartId = Number(req.params.id)
    const prodId = Number(req.params.id_prod)
    res.send(c.deleteById(cartId, prodId))
});



//middlewares JSON, URL y archivos estaticos siempre antes del middlewares de rutas 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//middlewares rutas router
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)



//consfiguro servidor
const PORT = 8080 || process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server listening Port ${server.address().port}`)
});
server.on('error', (err) => console.log(err));

