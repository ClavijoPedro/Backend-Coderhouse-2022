import ContenedorMongoDB from "../containers/ContenedorMongoDB.js";
import ProductoSchema from '../models/ProductoSchema.js'


const ProductosDaoMongoDB = new ContenedorMongoDB('producto',ProductoSchema)

export default ProductosDaoMongoDB;