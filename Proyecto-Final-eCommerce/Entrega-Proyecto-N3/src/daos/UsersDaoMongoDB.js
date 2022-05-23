import ContenedorMongoDB from '../containers/ContenedorMongoDB.js'
import {UserSchema} from '../models/UserSchema.js'


const UsersDaoMongoDB = new ContenedorMongoDB('user', UserSchema);

export default UsersDaoMongoDB;