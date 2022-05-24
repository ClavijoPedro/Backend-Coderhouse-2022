import {Router} from 'express';
import passport from 'passport';
import routeInfo from '../middlewares/routeInfo.js'
import userController from '../controllers/userController.js'
import isAuth from '../middlewares/isAuth.js';

const userRouter = new Router()


userRouter.get('/', routeInfo, isAuth, userController.getInitial);

userRouter.post('/login', routeInfo, passport.authenticate('login', {failureRedirect:'/login_error', successRedirect:'/datos'}));

userRouter.post('/register', routeInfo, passport.authenticate('register', {failureRedirect:'/register_error', successRedirect:'/'}));

userRouter.get('/login', routeInfo, userController.getLogin);

userRouter.get('/login_error', routeInfo, userController.getLoginError);

userRouter.get('/register', routeInfo, userController.getRegister);

userRouter.get('/register_error', routeInfo, userController.getRegisterError);

userRouter.get('/logout', routeInfo, userController.getLogout);


export default userRouter;