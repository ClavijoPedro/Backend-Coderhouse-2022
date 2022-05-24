import passport from 'passport';
import { Strategy } from 'passport-local';
import UsersDaoMongoDB from '../daos/UsersDaoMongoDB.js'
import bcrypt from 'bcrypt';

const usersDao = UsersDaoMongoDB;

const LocalStrategy = Strategy;

passport.use('register', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',//paso el name de los inputs
    // passReqToCallback: true //pasa el resto de las prop del req.body aparte del username y password
    },
    async (email, password, done) => {

        const userExists = await usersDao.listOne({email});
        
        if(userExists){
            return done('El usuario ya esta registrado')
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const user = {
            email,
            password:hashPassword,
        }
        await usersDao.save(user);
        console.log(user)
        return done(null, user);
    })
);


passport.use('login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
    },
    async (email, password, done) => {
      let user = await usersDao.listOne({email});

        if (!user) {
            console.log(`Usuario ${email} no encontrado`);
            return done(null, false);
        }

        if(!isValidPassword(user, password)){
            return done(null, false);
        }
        
        return done(null, user);
    })
);

//desencripta la password guardada en la DB y la compara con la ingresada en el login
function isValidPassword(user, password){
    return bcrypt.compareSync(password, user.password);
}


//serializacion manipula datos de acceso
passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) =>{
    const user = usersDao.listOne({email});
    done(null, user)
});
