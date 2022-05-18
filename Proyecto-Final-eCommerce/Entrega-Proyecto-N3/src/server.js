import express from 'express';
import config from '../config.js';
import { logger } from './utils/logger.js'; 
import { cpus } from 'os';
import cluster from 'cluster';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';




//Router
import productosRouter from './routers/productos.js';
import carritoRouter from './routers/carrito.js';
import userRouter from './routers/user.js'


//inicializo passport
import './auth/passport.js'


const app = express();


//middlewares JSON, URL y archivos estaticos  
app.use(express.static('./src/public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



//session
app.use(cookieParser())
app.use(session({
    secret: config.PRIVATE_KEY,
    saveUninitialized: true,
    rolling:true,
    saveUninitialized:false,
    resave: true,
    cookie: {
        maxAge: 600000
    }
}))


//Passport
app.use(passport.initialize());
app.use(passport.session());



//middlewares router
app.use('/', userRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)



//config Clusters && Server  
const numCPUs = cpus().length

if(cluster.isPrimary && config.MODO === 'cluster' ){
    logger.info(`Primary running PORT ${config.PORT} - PID - ${process.pid}`)

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, _code, _signal) => {
        logger.info(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

}else{

    const server = app.listen(config.PORT, ()=>{
        logger.info(`Worker running PORT - ${config.PORT} - PID - ${process.pid}`)
    });
    server.on('error', (error) => logger.error(error));

}


