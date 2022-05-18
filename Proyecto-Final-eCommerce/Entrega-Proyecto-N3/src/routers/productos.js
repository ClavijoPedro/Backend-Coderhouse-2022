//traigo router y defino nombre
import { Router } from 'express';
import prodControl from '../controllers/productosController.js'
import isAuth from '../middlewares/isAuth.js'


//instancia router
const productosRouter = Router();


//lista todos los productos disponibles ó un producto por su id
productosRouter.get('/:id?', isAuth, prodControl.getProducts);


//incorporar productos al listado
productosRouter.post('/', prodControl.saveProducts);

//Actualiza un producto por su id 
productosRouter.put('/:id', prodControl.UpdateProducts)

//Borra un producto por su id 
productosRouter.delete('/:id?', prodControl.deleteProduct);


export default productosRouter

 