const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');

//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

//traigo los containers
const FileContainer = require('./containers/FileContainer') 
const MemContainer = require('./containers/MemContainer');
const apiFile = new FileContainer();
const apiMemo = new MemContainer();

//defino middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//defino endpoints
io.on('connection', socket => {
    console.log('usuario conectado!');

    //emito evento con la lista de productos
    socket.emit('productList', apiMemo.prodList());

    //capturo el producto emitido del lado del cliente, guardo y propago
    socket.on('newProduct', prod => {
        apiMemo.addProd(prod);
        io.sockets.emit('productList', apiMemo.prodList());
    });

    //emito evento con la lista de mensajes
    socket.emit('messages', apiFile.msjList());

    //capturo el mensaje emitido del lado del cliente, guardo y propago
    socket.on('newMessage', msj => {
        console.log(msj);
        apiFile.addMsj(msj);
        io.sockets.emit('messages', apiFile.msjList());
        console.log(apiFile.msjList())
    })
})

//configuro server
httpServer.listen(8080, () => {
    console.log(`Server listening port ${httpServer.address().port}`)
}).on('error', (error) => console.log(error));