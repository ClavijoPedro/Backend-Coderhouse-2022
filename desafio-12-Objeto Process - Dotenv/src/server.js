import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
import config from '../config.js';

//session
import session from 'express-session';
import cookieParser from 'cookie-parser';

//passport
import passport from 'passport';
import { Strategy } from 'passport-facebook';

//routes controllers
import sessionRoutes from './controllers/session-controller.js';
import dataRoutes from './controllers/data-controller.js';
import wsRoutes from './controllers/webSock-controller.js';

//motor de plantillas 
import handlebars from 'express-handlebars';


//Authentication Facebook strategy
const FacebookStrategy = Strategy;


//app y server
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//*==================================[MIDDLEWARES]======================================*//


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//------------------------SESSION-------------------------------//
   
app.use(cookieParser())
app.use(session({
      secret: 'secreto',
      saveUninitialized: true,
      resave: false,
        cookie: {
            secure:'auto',
            maxAge: 60000
        }
    })
);
    
//-----------------------------PASSPORT & STRATEGY----------------------------------------------//

app.use(passport.initialize());
app.use(passport.session())

const FACEBOOK_APP_ID = config.facebookID;
const FACEBOOK_APP_SECRET = config.facebookSECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    enableProof:true,
    profileFields: ['id', 'displayName', 'photos', 'email']
    },

    function(accessToken, refreshToken, profile, cb) {
        console.log('esto es datos usuario', profile)
        return cb(null, profile);
      }
));


//persistencia de session
passport.serializeUser((user, done) => {
    done(null,user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj)

});


//*==================================[MOTOR PLANTILLAS]======================================*//

 
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: 'public/templates'
}));
app.set('view engine', 'hbs');
app.set('views', 'public/templates');



//*==================================[Rutas authenticate]======================================*//


app.get('/auth/facebook',  passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/datos', authType: 'reauthenticate' }));


//*==================================[Rutas login]======================================*//


app.get('/', sessionRoutes.getInitial);

app.get('/login', sessionRoutes.getLogin);


//*==================================[Ruta datos ]======================================*//


app.get('/datos', dataRoutes.getData);


//*==================================[Ruta info]======================================*//


app.get('/info', (dataRoutes.getInfo))

app.get('/api/randoms?:cant', dataRoutes.getRandom)


//*==================================[Ruta Logout]======================================*//


app.get('/logout', sessionRoutes.getLogout);


//*==================================[Ruta webSockets]======================================*//


io.on('connection', wsRoutes.webSockets);


//*==================================[SERVER]======================================*//

//puerto pasado con flag -p 3000 por CLI - minimist en config.js 
httpServer.listen(config.PORT, () => {
    console.log(`Server listen PORT ${config.PORT}`)
}).on('error', (error) => console.log(error));