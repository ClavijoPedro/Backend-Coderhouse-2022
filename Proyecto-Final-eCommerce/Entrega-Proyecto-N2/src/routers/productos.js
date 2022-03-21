//traigo router y defino nombre
import { Router } from 'express';
import { productos } from './../daos/index.js'

//instancio router
const productosRouter = Router();


//endpoints



//lista todos los productos disponibles ó un producto por su id
productosRouter.get('/:id?', async (req, res) => {   
    const { id } = req.params;
    try{
        const product = await productos.listById(id); 
        const prodList = await productos.listAll();             
        res.status(200).send(id ? product : prodList); 
    }catch(err){ console.log(err) };
});



//incorporar productos al listado
productosRouter.post('/', async (req, res) => {   
    const item = req.body;
    try{
        if(Object.keys(item).length > 0){ 
            const prodId = await productos.save(item);     
            res.status(200).send(prodId);
        }else{console.log('ingrese un objeto valido')}; 
    }catch(err){ console.log(err) };
});



//Actualiza un producto por su id 
productosRouter.put('/:id', async (req, res) => {   
    const { id } = req.params;
    const prod = req.body;     
    try{
        if(id && Object.keys(prod).length > 0){
            await productos.updateById(id, prod);
            res.status(201).send('Producto Actualizado');
        }
    }catch(err){ console.log(err) }           
});



//Borra un producto por su id 
productosRouter.delete('/:id?', async (req, res) => {  
    const { id } = req.params;            
    try{
        if(id){
            await productos.deleteById(id);
            res.status(200).send('Producto eliminado');
        };
    }catch(err){ console.log(err)}
});


export default productosRouter

 