import config from '../../config.js'
import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js'
import MensajeSchema from '../models/mensaje.schema.js'

const MONGO_URI = config.mongoDB;


const MensajesDaoMongoDB = new ContenedorMongoDB(MONGO_URI, MensajeSchema);

export default MensajesDaoMongoDB;