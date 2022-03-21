import  dotenv from 'dotenv'
dotenv.config()

export default{
    firebaseDB: process.env.FIREBASE_ACCOUNT_KEY,
    mongoDB: process.env.MONGO_DB_URI,
    fileSystemDB: {
        productos: './DB/productos.json',
        carrito: './DB/carrito.json', 
    },
    PORT: process.env.SERVER_PORT
}


