import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js'
import config from '../../config.js'
import MensajeSchema from '../models/mensaje.schema.js'

const mongoURI = config.mongoDB;

const MensajesDao = new ContenedorMongoDB(mongoURI, MensajeSchema);

export default MensajesDao;