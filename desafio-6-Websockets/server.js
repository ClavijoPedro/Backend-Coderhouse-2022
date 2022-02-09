const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io')
const exphbs = require('express-handlebars');

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: 'views'
}));

const FileContainer = require('./containers/FileContainer');
const MemContainer = require('./containers/MemContainer')
const fileApi = new FileContainer();
const memApi = new MemContainer();

// end points
app.get('/', (req, res) => {
    res.render('form.hbs')
})

io.on('connection', (socket) => {
    console.log('usuario conectado');

    //traigo la data del container y la emito
    socket.emit('listaProductos', memApi.prodList())

    //capturo la data del form y la reenvio
    socket.on('newProduct', prod => { 
        console.log(memApi.prodList())
        memApi.addProd(prod)
        io.sockets.emit('listaProductos', memApi.prodList());
    });
})


// defino view engine y el path del view
app.set('view engine', 'hbs');
app.set('views', './views');


// server config
httpServer.listen(3000, () => {
    console.log(`Server listening at port ${httpServer.address().port}`)
}).on('error', error => console.log(`Error en servidor ${error}`));