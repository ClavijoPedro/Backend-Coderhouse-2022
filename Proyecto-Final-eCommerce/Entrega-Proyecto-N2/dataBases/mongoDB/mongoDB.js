const mongoose = require('mongoose');
const { mongoDB } = require('./../../config') //traigo la configuracion de conexion de config.js

//guardo la config
const MONGO_URI = mongoDB.connection;

//conecto DB y paso config
 mongoose.connect(`${MONGO_URI}`) 
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err))