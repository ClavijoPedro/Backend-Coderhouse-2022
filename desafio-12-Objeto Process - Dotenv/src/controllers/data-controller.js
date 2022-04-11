'use strict'
import { createData } from '../utils/fakeProducts.js';
import minimist from 'minimist';
import {fork} from 'child_process'


//argumentos CLI
const args = minimist(process.argv.splice(2));


//*==================================[DATA]======================================*//


async function getData (req,res) {
    if(req.isAuthenticated()){
        try{
            const productos = await createData(5);
            const userData = {
                name: req.user.displayName,
                photo: req.user.photos[0].value,
                mail: req.user.emails[0].value
            }
            console.log('esto es mail', req.user.mail)
            console.log('esto es user data',userData)
            res.render('home', { usuario: userData, products:productos})   
        }catch(err){console.log(err)}
    }else{
        console.log('usuario no autenticado')
        res.redirect('/')
    }
};



function getInfo(req,res){
    const info = {
        argumentos: args._,
        sistema: process.platform,
        node: process.version,
        memoria: process.memoryUsage().rss,
        path: process.execPath,
        processID: process.pid,
        folder:process.cwd()
    }
    if(Object.values(info).length){
        res.render('info', {info})
    }
};



function getRandom(req,res){
    const cantidad = Number(req.query.cant);
    //traigo el archivo child 
    const createRandoms = fork('./src/utils/randomNumbers.js')
    createRandoms.send(cantidad);
    //esucha evento message del child trae la respuesta y envia al cliente
    createRandoms.on('message', random => res.send(random))
};



export default{
    getData,
    getInfo,
    getRandom
}