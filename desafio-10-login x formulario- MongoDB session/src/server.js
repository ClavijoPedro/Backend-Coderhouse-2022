import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
import { createData } from './utils/fakeProducts.js'
import { normalizeChat } from './utils/normalizeChat.js';
import config from '../config.js'

import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'


//traigo motor de plantillas 
import handlebars from 'express-handlebars'
import MensajesDaoMongoDB from './daos/MensajesDaoMongoDB.js';


//instancio containers de chat
const mensajesDao = MensajesDaoMongoDB;


//__dirname para ESmodules
import path from 'path';
const __dirname = path.resolve();


//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);



//defino middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//middlewares cookies y mongo-connect para session
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}    
app.use(cookieParser())
app.use(session({
      secret: 'secreto',
      saveUninitialized: true,
      resave: false,
      store: MongoStore.create({
          mongoUrl: config.mongoDB,
          mongoOptions:advancedOptions,
          ttl:10,
        }),
        cookie: {
            maxAge: 10000
        }
  }));


//defino motor plantilla handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: 'public/templates'
}))



//-----------------ruta session---------------------------------------//


app.get('/', async (req,res) => {
    const name = req.session?.name
    // console.log(req.sessionStore)
    try{
        const productos = await createData(5);
        // console.log('esto es get /' ,name)
        if(name){
            res.render('home', {nombre: name, products:productos})
        }else{
            res.redirect('/login')
        }    
    }catch(err){console.log(err)}
})



app.get('/login', (req,res) => {
    const name = req.session?.name
    if(name){
        res.redirect('/')
    }else{
        res.sendFile(__dirname + '/public/login.html')
    }
})



app.post('/login', (req,res) => {
    req.session.name = req.body?.userLog
    if(req.session.name){
        res.redirect('/')
    }
})



app.get('/logout', (req,res) => {
    const name = req.session?.name
    if(name){
        req.session.destroy(err => {
            if(!err){
                res.render('logOut', {nombre:name})
            }else{
               res.send({status: 'Logout ERROR', body: err})
            }
        })
    }else{
        res.redirect('/')
    }
})


//----------------- web Sokets-----------------------------//


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


//seteo motor de plantilla
app.set('view engine', 'hbs');
app.set('views', 'public/templates');


//configuro server
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listen PORT ${PORT}`)
}).on('error', (error) => console.log(error));