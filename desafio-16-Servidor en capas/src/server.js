import config from './config/config.js';
import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
import cluster from 'cluster';
import { cpus } from 'os';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { logger } from './utils/logger.js';
import MongoStore from 'connect-mongo';

//route & websokets controllers
import userRouter from './routes/userRoutes.js';
import infoRouter from './routes/infoRouter.js';
import noMatchRouter from './routes/noMatchRouter.js';
import wSokets from './controllers/webSock-controller.js';

import passport from 'passport'

//motor de plantillas 
import handlebars from 'express-handlebars';

//inicializo passport
import './auth/passportLocal.js'

//servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//*==================================[MIDDLEWARES]======================================*//

console.log(process.cwd())
app.use(express.static('../public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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



app.use(passport.initialize());
app.use(passport.session());

 //*==================================[MOTOR DE PLANTILLAS]======================================*//   


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: '../public/templates'
}))
app.set('view engine', 'hbs');
app.set('views', '../public/templates');
    


//*==================================[ENDPOINTS]======================================*//


app.use('/', userRouter)
app.use('/', infoRouter)
app.use('/', noMatchRouter)

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
        if(!err) logger.info(`Server listeninig PORT ${PORT} - PID WORKER ${process.pid}`)
    }).on('error', (error) => console.log(error));
}