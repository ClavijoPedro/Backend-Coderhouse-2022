// require('dotenv').config() //cargo el manejador de variables de entorno
const {firebaseDB} = require('./../../config')//traigo la configuracion de conexion de config.js
const {initializeApp, cert} = require('firebase-admin/app'); //traigo los servicios de firebase-admin 
const {getFirestore} = require('firebase-admin/firestore'); 

initializeApp({
    // credential: cert(JSON.parse(process.env.FIREBASE_ACCOUNT_KEY)),//inicializo la app (traigo configuracion con .env)
    credential: cert(firebaseDB.credentials),//inicializo la app (traigo configuracion con .env)
})

const db = getFirestore();

module.exports = {
    db,
}

