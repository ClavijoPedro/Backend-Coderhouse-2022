import ContenedorMongoDB from "../containers/ContenedorMongoDB.js";
import CarritoSchema from '../models/CarritoSchema.js'


const CarritoDaoMongoDB = new ContenedorMongoDB('carrito', CarritoSchema);

export default CarritoDaoMongoDB;
