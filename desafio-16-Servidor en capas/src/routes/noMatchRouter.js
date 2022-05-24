import { Router } from 'express';
import routeError from '../middlewares/routeError.js'
import noMatch from '../controllers/noMatchController.js';

const noMatchRouter = new Router();

noMatchRouter.all('*', routeError, noMatch)

export default noMatchRouter;