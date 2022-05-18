import ContenedorMongoDB from "../containers/ContenedorMongoDB.js";
import CarritoSchema from '../models/CarritoSchema.js'
import config from "../../config.js";


const MONGO_URI = config.MONGO_URI;

const CarritoDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'carrito', CarritoSchema);

export default CarritoDaoMongoDB;
