const express = require('express');
const {PORT} = require('../config')

const app = express();


//traigo router
const productos = require('./router/productos')
const carrito = require('./router/carrito')


//middlewares JSON, URL y archivos estaticos siempre antes del middlewares de rutas 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


//middlewares rutas router
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)


//configuro servidor
const server = app.listen(PORT, ()=>{
    console.log(`Server listening Port ${PORT}`)
}).on('error', (error) => console.log(error));