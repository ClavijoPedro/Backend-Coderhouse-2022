require('dotenv').config()

//traigo las keys de las DB con .env y las exporto 
module.exports = {
    firebaseDB: {credentials: JSON.parse(process.env.FIREBASE_ACCOUNT_KEY)},
    mongoDB: {connection: process.env.MONGO_DB_URI},
    PORT: process.env.PORT
}


// const {firebaseDB, mongoDB, PORT} = require('./config.js')
// // console.log(process.env.FIREBASE_ACCOUNT_KEY)
// console.log("\n"+firebaseDB.credentials + "\n\n", mongoDB.connection +"\n\n", PORT +"\n\n")