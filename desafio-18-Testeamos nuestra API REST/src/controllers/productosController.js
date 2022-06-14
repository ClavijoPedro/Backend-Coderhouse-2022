import logger from '../utils/logger.js';
import ProductsRepository from '../repositories/ProductsRepository.js';


const products = new ProductsRepository();


//lista todos los productos disponibles ó un producto por su id
const getProducts = async (req, res) => {   
    const { id } = req.params;
    try{
        const product = id ? await products.getById(id):'';
        const prodList = await products.getAll();          
        res.status(200).json(id ? product : prodList); 
    }catch(err){ logger.error(err) };
};


//incorporar productos al listado
const saveProducts = async (req, res) => {   
    const item = req.body;
    try{
        if(Object.keys(item).length > 0){ 
            const prodId = await products.add(item);   
            res.status(200).json(prodId);
        }else{logger.warn('Objeto no valido ingresado')}; 
    }catch(err){ logger.error(err) };
};


//Actualiza un producto por su id 
const UpdateProducts = async (req, res) => {   
    const { id } = req.params;
    const prod = req.body;     
    try{
        if(id && Object.keys(prod).length > 0){
            await products.updateById(id, prod);
            res.status(201).json({status:'Producto Actualizado', id:id});
        }
    }catch(err){ logger.error(err) }           
};


//Borra un producto por su id 
const deleteProduct = async (req, res) => {  
    const { id } = req.params;            
    try{
        if(id){
            await products.deleteById(id);
            res.status(200).json({status:'Producto eliminado', id:id});
        };
    }catch(err){ logger.error(err) }
};



export default{
    getProducts,
    saveProducts,
    UpdateProducts,
    deleteProduct,
}