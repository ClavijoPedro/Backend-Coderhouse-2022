import passport from 'passport'
import { Strategy } from "passport-local";
import { logger } from "../utils/logger.js";
import {hashPassword, isValidPassword} from '../utils/encryptPassword.js'
import UsersDaoMongoDB from '../daos/UsersDaoMongoDB.js';
import sendMail from '../utils/sendMail.js';


const LocalStrategy = Strategy;

//users DB
const users = UsersDaoMongoDB;

const ADMIN_MAIL = 'clavijopedro.dev@gmail.com';

//Login
passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
    async (req,email, password, done) => {
        try{      
            let user = await users.listOne({email});
            if (!user) {
                logger.error(`Usuario ${email} no encontrado`);
                return done(null, false, {message:'Usuario no encontrado'});
            }
            if(!isValidPassword(user, password)){
                return done(null, false, {message:'Contraseña invalida'});
            }
            return done(null, user);
        }catch(error){logger.info(error)}
    }
    ));
    
    
    //Register
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try{
            let user = await users.listOne({email})
            if(user){
                return done(`El usuario ${email} ya esta registrado`)
            }
            const hashedPassword = hashPassword(password);
            
            //traigo avatar de public y lo paso a user
            const newUser = {
                ...req.body,
                password: hashedPassword,
                avatar: req.file.filename
            };

            //mando mail
            const mailOptions = {
                from: 'Servidor Node.js',
                to: ADMIN_MAIL,
                subject: 'Nuevo registro',
                html: 
                    `<h3>Nuevo usuario Registrado</h3><br>
                        <ul style='list-style:none;' >
                            <li><b>Nombre:</b> ${newUser.name}</li>
                            <li><b>Email:</b> ${newUser.email}</li>
                            <li><b>Edad:</b> ${newUser.age}</li>
                            <li><b>Dirección:</b> ${newUser.address}</li>
                            <li><b>Teléfono:</b> ${newUser.phone}</li>
                            <li><b>Avatar:</b> ${newUser.avatar}</li>
                        </ul>`
                    ,
            }
            const infoToAdmin = sendMail(mailOptions)

            //guardo en mongo
            users.save(newUser)

            //guardo newUser en req.user
            return done(null, newUser)

        }catch(error){done(error)}
    }
));


//serialize
passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) =>{
    const user = users.listOne({email});
    done(null, user)
});



export default passport
