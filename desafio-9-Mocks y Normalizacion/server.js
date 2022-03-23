import express from 'express';
import { createServer as HTTPServer} from 'http';
import { Server as IOServer } from 'socket.io';
// import DataBase from './containers/DataBase.js';
import {createData} from './src/utils/fakeProducts.js'

//traigo motor de plantillas 
import handlebars from 'express-handlebars'
import MensajesDao from './src/daos/MensajesDaoMongoDB.js';


//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//instancio containers
const mensajes = MensajesDao;



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


app.get('/api/productos-test',   async (req, res) => {
    try{
        const productos = await createData(5)
        res.render('table',{ products: productos})
    }catch(err) { console.log(err)}
})



//defino Sokets
io.on('connection', async socket => {
    console.log('usuario conectado!');


    //traigo la data de forma asincrona 
    const messages = await mensajes.listAll();


    // si hay data la emito (sin el if se genera conflicto, el socket no espera la promise 
    //que devuelve la funcion de Knex dentro de listData())
    //---------------------------chat----------------------------------------------------------
    
    if(messages){
        try{
            
            console.log(messages)
            // emito evento con la lista de mensajes
            socket.emit('messages', messages);
            
            // // capturo el mensaje emitido del lado del cliente, guardo y propago
            socket.on('newMessage', async msj => {
                messages.push(msj) 
                await mensajes.save(msj);
                io.sockets.emit('messages', messages);
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
    console.log(`Server listening port ${httpServer.address().port}`)
}).on('error', (error) => console.log(error));