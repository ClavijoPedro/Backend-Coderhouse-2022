import ContenedorArchivo from './../../contenedores/ContenedorArchivo.js';
import config from './../../../config.js'

const fsConfig = config.fileSystemDB.productos;

const ProductoDaoArchivo = new ContenedorArchivo(fsConfig)

export default ProductoDaoArchivo;