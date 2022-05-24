import { Router } from 'express';
import isAuth from '../middlewares/isAuth.js';
import routeInfo from '../middlewares/routeInfo.js';
import infoController from '../controllers/infoController.js'
import compression from 'compression';

const infoRouter = new Router();


infoRouter.get('/datos', routeInfo, isAuth, infoController.getProducts);

infoRouter.get('/info', routeInfo, infoController.getInfo);

infoRouter.get('/infogzip', compression(), infoController.getInfo);

infoRouter.get('/api/randoms?:cant', routeInfo, infoController.getRandom);


export default infoRouter;