const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const DataBase = require('./containers/DataBase');


//traigo motores de base de datos
const {optionsMDB} = require('./options/mariaDB');
const {optionsSQL3} = require('./options/SQLite3');
const knexSQL3 = require('knex')(optionsSQL3);
const knexMADB = require('knex')(optionsMDB);


//defino app y servers
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);


//instancio container, paso options de la DB y nombre de tabla
const sql3 = new DataBase(knexSQL3, 'chat')
const maDB = new DataBase(knexMADB, 'products'); 


//defino middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


//defino Sokets
io.on('connection', async socket => {
    console.log('usuario conectado!');


    //traigo la data de forma asincrona 
    const products = await maDB.listData();
    const messages = await sql3.listData();


    // si hay data la emito (sin el if se genera conflicto, el socket no espera la promise 
    //que devuelve la funcion de Knex dentro de listData())
    if(products){
        try{

            // emito evento con la lista de productos
            socket.emit('productList', products);
            
            //capturo el producto emitido del lado del cliente, guardo y propago
            socket.on('newProduct', async prod => {
                products.push(prod)//guardo en memoria para que renderice sin tener que refrescar el browser
                await maDB.saveData(prod);//guardo en DB
                io.sockets.emit('productList', products);
            });

        }catch(err){console.log(err)} 
    }

    //---------------------------chat----------------------------------------------------------
    
    if(messages){
        try{
            
            console.log(messages)
            //emito evento con la lista de mensajes
            socket.emit('messages', messages);
            
            //capturo el mensaje emitido del lado del cliente, guardo y propago
            socket.on('newMessage', async msj => {
                messages.push(msj) 
                await sql3.saveData(msj);
                io.sockets.emit('messages', messages);
            });

        }catch(err){console.log(err)}
        
    }
    
});


//configuro server
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening port ${httpServer.address().port}`)
}).on('error', (error) => console.log(error));