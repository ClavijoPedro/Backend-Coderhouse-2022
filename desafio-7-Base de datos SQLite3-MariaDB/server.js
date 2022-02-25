const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const DataBase = require('./containers/DataBase');


//traigo motores de base de datos
const {optionsMDB} = require('./options/mariaDB');
const {optionsSQL3} = require('./options/SQLite3');


//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//instancio container, paso options de la DB y nombre de tabla
const sql3 = new DataBase(optionsSQL3, 'chat')
const maDB = new DataBase(optionsMDB, 'products'); 


//defino middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//defino endpoints
io.on('connection', socket => {

    console.log('usuario conectado!');
    
    // emito evento con la lista de productos
    socket.emit('productList', maDB.listData());
    
    //capturo el producto emitido del lado del cliente, guardo y propago
    socket.on('newProduct', prod => {
        maDB.saveData(prod);
        io.sockets.emit('productList', maDB.listData());
    });

//---------------------------chat----------------------------------------------------------

    //emito evento con la lista de mensajes
    socket.emit('messages', sql3.listData());

    //capturo el mensaje emitido del lado del cliente, guardo y propago
    socket.on('newMessage', msj => {
        sql3.saveData(msj);
        io.sockets.emit('messages', sql3.listData());
    })
})


//configuro server
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening port ${httpServer.address().port}`)
}).on('error', (error) => console.log(error));