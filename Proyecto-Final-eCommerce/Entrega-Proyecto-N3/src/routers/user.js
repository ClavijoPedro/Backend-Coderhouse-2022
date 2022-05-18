import { Router } from "express";
import userControl from '../controllers/userController.js'
import passport from 'passport'
import upload from "../utils/multerUpload.js";


const userRouter = new Router()

userRouter.get('/', userControl.getInitial)

userRouter.post('/login', passport.authenticate('login', 
    {
        failureRedirect: '/login_error',
        successRedirect:'/api/productos'
    }
));

userRouter.post('/register', upload, passport.authenticate('signup', 
    {
        failureRedirect:'/signup_error',
        successRedirect:'/api/productos'
    }
));

userRouter.post('/uploads', userControl.uploads)

userRouter.get('/logout', userControl.logOut);

userRouter.get('/login_error', userControl.loginError);

userRouter.get('/signup_error', userControl.signupError);


export default userRouter