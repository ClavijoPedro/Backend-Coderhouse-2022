import { Router } from 'express';
import e404Control from '../controllers/404Controller.js'

const error404Router = Router();


error404Router.get('*', e404Control.get404);

export default error404Router