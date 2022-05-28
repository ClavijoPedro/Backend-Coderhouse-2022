import logger from '../utils/logger.js';
import ProductosDaoMongoDB from '../daos/ProductosDaoMongoDB.js';

const productos = ProductosDaoMongoDB;


//lista todos los productos disponibles ó un producto por su id
const getProducts = async (req, res) => {   
    const { id } = req.params;
    try{
        const {name, avatar, email} = await req.user
        const product = await productos.listById(id); 
        const prodList = await productos.listAll();
        //paso plantilla y data a ejs             
        res.status(200).render(
            'products', {
                title:'productos',
                products:id ? product : prodList,
                name:name,
                avatar:`/uploads/${avatar}`,
                email:email
            }); 
    }catch(err){ logger.error(err) };
};


//incorporar productos al listado
const saveProducts = async (req, res) => {   
    const item = req.body;
    try{
        if(Object.keys(item).length > 0){ 
            const prodId = await productos.save(item);     
            res.status(200).send(prodId);
        }else{logger.warn('Objeto no valido ingresado')}; 
    }catch(err){ logger.error(err) };
};


//Actualiza un producto por su id 
const UpdateProducts = async (req, res) => {   
    const { id } = req.params;
    const prod = req.body;     
    try{
        if(id && Object.keys(prod).length > 0){
            await productos.updateById(id, prod);
            res.status(201).send('Producto Actualizado');
        }
    }catch(err){ logger.error(err) }           
};


//Borra un producto por su id 
const deleteProduct = async (req, res) => {  
    const { id } = req.params;            
    try{
        if(id){
            await productos.deleteById(id);
            res.status(200).send('Producto eliminado');
        };
    }catch(err){ logger.error(err) }
};



export default{
    getProducts,
    saveProducts,
    UpdateProducts,
    deleteProduct,
}