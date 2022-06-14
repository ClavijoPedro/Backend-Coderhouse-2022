import { Router } from 'express';
import prodControl from '../controllers/productosController.js'
// import isAdmin from '../middlewares/isAdmin.js';


//instancia router
const adminRouter = Router();


//incorporar productos al listado
// adminRouter.post('/', isAdmin, prodControl.saveProducts);
adminRouter.post('/', prodControl.saveProducts);

//Actualiza un producto por su id 
// adminRouter.put('/:id', isAdmin, prodControl.UpdateProducts)
adminRouter.put('/:id', prodControl.UpdateProducts)

//Borra un producto por su id 
// adminRouter.delete('/:id?', isAdmin, prodControl.deleteProduct);
adminRouter.delete('/:id?', prodControl.deleteProduct);


export default adminRouter