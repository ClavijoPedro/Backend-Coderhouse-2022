import express from 'express';
import config from '../config.js';

const app = express();

//traigo router
import productosRouter from './routers/productos.js';
import carritoRouter from './routers/carrito.js';


//middlewares JSON, URL y archivos estaticos  
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


//middlewares rutas router
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)


//config servidor
const PORT = config.PORT || process.env.PORT
const server = app.listen(PORT, ()=>{
    console.log(`Server listening Port ${PORT}`)
});
server.on('error', (error) => console.log(error));