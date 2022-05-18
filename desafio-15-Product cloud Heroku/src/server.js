import express from 'express';
import config from './../config.js';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';

//cluster & CPUs
import cluster from 'cluster';
import { cpus } from 'os';

//mogo store
import MongoStore from 'connect-mongo';

//route & websokets controllers
import routes from './controllers/routes-controller.js';
import wSokets from './controllers/webSock-controller.js';

//session
import session from 'express-session';
import cookieParser from 'cookie-parser';

//passport
import passport from 'passport';
import { Strategy } from 'passport-local';

//encriptado
import bcrypt from 'bcrypt';

// motor de plantillas 
import handlebars from 'express-handlebars';

//containers
import UsersDaoMongoDB from './daos/UsersDaoMongoDB.js';

//instancia containers DAOS
const usersDao = UsersDaoMongoDB;

//Authentication & Strategy
const LocalStrategy = Strategy;


//servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//*==================================[MIDDLEWARES]======================================*//


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../public'));//comentar usando Nginex (el mismo ofrece los recursos estaticos en root) 


//------------------------SESSION-------------------------------//

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true} 
app.use(cookieParser())
app.use(session({
        store: MongoStore.create({ 
            mongoUrl: config.mongoDB,
            mongoOptions:advancedOptions,
        }),
        secret: 'secreto',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000
        }
    })
);

//-----------------------------PASSPORT & STRATEGY----------------------------------------------//

app.use(passport.initialize());
app.use(passport.session());


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



 //*==================================[MOTOR DE PLANTILLAS]======================================*//   


    app.engine('hbs', handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: '../public/templates'
    }))
    app.set('view engine', 'hbs');
    app.set('views', '../public/templates');
    


//*==================================[AUTH MIDDLEWARE]======================================*//

function isAuth(req,res,next){
    req.isAuthenticated() ? next() : res.redirect('/login');
};

//*==================================[RUTA INICIAL]======================================*//

app.get('/', isAuth, routes.getInitial);

//*==================================[RUTAS AUTHENTICATE]======================================*//

app.post('/login', passport.authenticate('login', {failureRedirect:'/login_error', successRedirect:'/datos'}));

app.post('/register', passport.authenticate('register', {failureRedirect:'/register_error', successRedirect:'/'}));

//*==================================[RUTAS LOGIN]======================================*//

app.get('/login', routes.getLogin);

app.get('/login_error', routes.getLoginError);

//*==================================[RUTAS REGISTER]======================================*//

app.get('/register', routes.getRegister);

app.get('/register_error', routes.getRegisterError);

//*==================================[RUTAS DATOS]======================================*//

app.get('/datos', isAuth, routes.getData);

app.get('/info', routes.getInfo);

app.get('/api/randoms?:cant', routes.getRandom);

//*==================================[RUTA LOGOUT]======================================*//

app.get('/logout', routes.getLogout);

//*==================================[Ruta webSockets]======================================*//

io.on('connection', wSokets.webSockets);


//*==================================[SERVER / CLUSTERS]======================================*//

const timestamp = new Date().toLocaleString();
const numCPUs = cpus().length;
const PORT = config.PORT;

if(cluster.isPrimary && config.MODO == 'cluster'){
    // console.log('Esto es Config.js',config)
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid} - PORT ${config.PORT}`)

    //por cada nucleo del cpu creo una rama con fork()
    for(let i = 0; i< numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log(`Worker ${worker.process.pid} died ${timestamp}`);
        cluster.fork() //cuando hago exit  o muere el cluster crea un nuevo process en otro process id
    })
    
}else{

    //*==================================[SERVER / WORKERS]======================================*//

    httpServer.listen(PORT, (err) => {
        if(!err) console.log(`Server listeninig PORT ${PORT} - PID WORKER ${process.pid}`)
    }).on('error', (error) => console.log(error));
}