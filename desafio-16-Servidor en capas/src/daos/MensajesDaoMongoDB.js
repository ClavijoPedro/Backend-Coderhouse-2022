import config from '../config/config.js'
import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js'
import MensajeSchema from '../models/mensaje.schema.js'

const MONGO_URI = config.mongoDB;


const MensajesDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'chat', MensajeSchema);

export default MensajesDaoMongoDB;