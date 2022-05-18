import config from '../../config.js';
import ContenedorMongoDB from '../containers/ContenedorMongoDB.js'
import {UserSchema} from '../models/UserSchema.js'

const MONGO_URI = config.MONGO_URI;


const UsersDaoMongoDB = new ContenedorMongoDB(MONGO_URI, 'user', UserSchema);

export default UsersDaoMongoDB;