import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
import { createData } from './utils/fakeProducts.js'
import { normalizeChat } from './utils/normalizeChat.js';


//traigo motor de plantillas 
import handlebars from 'express-handlebars'
import MensajesDaoMongoDB from './daos/MensajesDaoMongoDB.js';


//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//instancio containers de chat
const mensajesDao = MensajesDaoMongoDB;


//defino middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//defino motor plantilla (use handlebars del lado del cliente y del servidor)
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'table.hbs',
    layoutsDir: 'public/templates'
}))



//ruta productos
app.get('/api/productos-test',   async (req, res) => {
    try{
        const productos = await createData(5)
        res.render('table',{ products: productos})
    }catch(err) { console.log(err)}
})



//defino Sokets
io.on('connection', async socket => {
    console.log('usuario conectado!');

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

//sete motod de plantilla
app.set('view engine', 'hbs');
app.set('views', 'public/templates');


//configuro server
const PORT = 3000;
httpServer.listen(PORT, () => {
}).on('error', (error) => console.log(error));