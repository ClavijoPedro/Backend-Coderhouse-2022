import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";
import ProductoSchema from './../../models/ProductoModel.js'
import config from './../../../config.js'

const MONGO_URI = config.mongoDB;

const ProductosDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'producto',ProductoSchema)

export default ProductosDaoMongoDB;