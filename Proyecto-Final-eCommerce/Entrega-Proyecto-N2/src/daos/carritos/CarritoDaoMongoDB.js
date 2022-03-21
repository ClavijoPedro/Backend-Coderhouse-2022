import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";
import CarritoSchema from './../../models/CarritoModel.js'
import config from './../../../config.js'; 


const MONGO_URI = config.mongoDB;

const CarritoDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'carrito', CarritoSchema);

export default CarritoDaoMongoDB;
