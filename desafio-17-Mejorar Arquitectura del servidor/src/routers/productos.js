import { Router } from 'express';
import prodControl from '../controllers/productosController.js'
import isAuth from '../middlewares/isAuth.js'


//instancia router
const productosRouter = Router();


//lista todos los productos disponibles ó un producto por su id
productosRouter.get('/:id?', isAuth, prodControl.getProducts);

export default productosRouter

 