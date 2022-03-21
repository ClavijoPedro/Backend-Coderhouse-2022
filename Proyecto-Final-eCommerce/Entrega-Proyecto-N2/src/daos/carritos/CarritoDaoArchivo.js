import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';
import config from '../../../config.js'

const fsConfig = config.fileSystemDB.carrito 

const CarritoDaoArchivo = new ContenedorArchivo(fsConfig)

export default CarritoDaoArchivo;