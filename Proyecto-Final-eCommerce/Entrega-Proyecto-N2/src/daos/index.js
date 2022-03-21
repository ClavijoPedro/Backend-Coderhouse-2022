import dotenv from 'dotenv';
dotenv.config({path:'./.env'})

let carrito;
let productos;


if(process.env.DB === 'firebase'){
    const {default: CarritoDAo} = await import('./carritos/CarritoDaoFirebase.js');
    const {default: ProductosDao} = await import('./productos/ProductosDaoFirebase.js');
    carrito = CarritoDAo; 
    productos = ProductosDao;
}

if(process.env.DB === 'mongoDB'){
    const {default: CarritoDao} = await import('./carritos/CarritoDaoMongoDB.js');
    const {default: ProductosDao} = await import('./productos/ProductosDaoMongoDB.js');
    carrito = CarritoDao;
    productos = ProductosDao;
}

if(process.env.DB === 'fileSystem'){
    const{default: CarritoDao} = await import('./carritos/CarritoDaoArchivo.js');
    const{default: ProductosDao} = await import('./productos/ProductosDaoArchivo.js');
    carrito = CarritoDao;
    productos = ProductosDao;
}

export {carrito, productos}
