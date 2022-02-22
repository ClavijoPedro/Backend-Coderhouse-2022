//defino app
const express = require('express');
const app = express();


//traigo router
const productos = require('./router/products')
const carrito = require('./router/cart')


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

