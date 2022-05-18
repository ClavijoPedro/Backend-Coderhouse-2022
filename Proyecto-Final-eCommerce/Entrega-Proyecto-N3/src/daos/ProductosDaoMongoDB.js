import ContenedorMongoDB from "../containers/ContenedorMongoDB.js";
import ProductoSchema from '../models/ProductoSchema.js'
import config from '../../config.js'

const MONGO_URI = config.MONGO_URI;

const ProductosDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'producto',ProductoSchema)

export default ProductosDaoMongoDB;