import config from '../config/config.js'
import ContenedorMongoDB from '../contenedores/ContenedorMongoDB.js'
import UserSchema from '../models/user.schema.js'

const MONGO_URI = config.mongoDB;


const UsersDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'user', UserSchema);

export default UsersDaoMongoDB;