import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
import { createData } from './utils/fakeProducts.js'
import { normalizeChat } from './utils/normalizeChat.js';
import config from '../config.js'

//session
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'

//passport
import passport from 'passport';
import { Strategy } from 'passport-facebook';

//motor de plantillas 
import handlebars from 'express-handlebars'
import MensajesDaoMongoDB from './daos/MensajesDaoMongoDB.js';

//__dirname para ESmodules
import path from 'path';
const __dirname = path.resolve();


//instancio containers de chat
const mensajesDao = MensajesDaoMongoDB;


//Authentication Facebook strategy
const FacebookStrategy = Strategy;

//defino app y servers
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

})


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


app.get('/', (req,res) => {
    res.redirect('/login')
})

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/login.html')
})


//*==================================[ruta datos ]======================================*//


app.get('/datos', async (req,res) => {
    if(req.isAuthenticated()){
        try{
            const productos = await createData(5);
            const userData = {
                name: req.user.displayName,
                photo: req.user.photos[0].value,
                mail: req.user.emails[0].value
            }
            console.log('esto es mail', req.user.mail)
            console.log('esto es user data',userData)
            res.render('home', { usuario: userData, products:productos})   
        }catch(err){console.log(err)}
    }else{
        console.log('usuario no autenticado')
        res.redirect('/')
    }
});


//*==================================[Ruta Logout]======================================*//


app.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
});


//*==================================[Ruta webSockets]======================================*//


io.on('connection', async socket => {
    // console.log('usuario conectado!');
    
    //traigo data de chat, normalizo y saco compresion
    const messages = await mensajesDao.listAll()
    
    if(messages){
        try{
            // emito evento con la lista de mensajes normalizada
            socket.emit('messages', normalizeChat(messages));
            
            // capturo el mensaje emitido del lado del cliente, guardo y propago
            socket.on('newMessage', async msj => {
                await mensajesDao.save(msj);
                const newMessages = await mensajesDao.listAll()
                io.sockets.emit('messages', normalizeChat(newMessages));
            });

        }catch(err){console.log(err)}
    }
});


//*==================================[SERVER]======================================*//

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listen PORT ${PORT}`)
}).on('error', (error) => console.log(error));