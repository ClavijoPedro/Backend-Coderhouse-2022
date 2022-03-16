const ContenedorArchivo = require('./../../contenedores/ContenedorArchivo');

class ProductoDaoArchivo extends ContenedorArchivo{

    constructor(){
        super('dabase/productos.json') //pasa propiedades del contructor del padre para setearlas en la nueva class
    }
}

module.exports = ProductoDaoArchivo;