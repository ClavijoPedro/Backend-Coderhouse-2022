import { createData } from '../utils/fakeProducts.js'
import config from '../../config.js';
import {fork} from 'child_process';
import {cpus} from 'os';
import path from 'path';
import {logger} from '../utils/logger.js'


//argumentos CLI
const args = config.cliArgs;

//nucleos CPU
const numCPUs = cpus().length;


//*==================================[initial]======================================*//

function getInitial(req,res) {
    res.redirect('/datos');
};

//*==================================[LOGIN]======================================*//


function getLogin(req,res) {
    res.sendFile(path.join(process.cwd(),'../public/login.html'))
};

function getLoginError(req,res) {
    res.sendFile(path.join(process.cwd(),'../public/loginError.html'))
};
//*==================================[REGISTER]======================================*//


function getRegister(req,res) {
    res.sendFile(path.join(process.cwd(),'../public/register.html'))
};

function getRegisterError(req,res) {
    res.sendFile(path.join(process.cwd(),'../public/registerError.html'))

};

//*==================================[DATA]======================================*//


async function getProducts(req,res) {
    try{
        const user = await req.user
        const productos = createData(5);
        res.render('home', {nombre:user.email, products:productos})
    }catch(err){logger.error(err)}
}


async function getInfo(req,res){
    try{
        const info = {
            argumentos: args,
            sistema: process.platform,
            node: process.version,
            memoria: process.memoryUsage().rss,
            path: process.execPath,
            processID: process.pid,
            folder: process.cwd(),
            cpus: numCPUs
        }
        if(Object.values(info).length){
            if(config.clog){
                console.log(`info:`, info)
            }
            res.render('info', {info})
        }
    }catch(err){logger.error(err)}
};


async function getRandom(req,res){
    const qty = req.query.cant ? Number(req.query.cant) : 100000000;
    try{    
        let numbers = {}
        for (let i = 0; i < qty; i++) {
            const randomNumber = 1 + Math.floor(Math.random() * 1000)
            //si la key existe al value le agrego +1 sino value = 1
            numbers[randomNumber] = numbers[randomNumber] ? numbers[randomNumber] + 1 : 1
        } 
        res.send(numbers)  
    }catch(err){logger.warn(err)}
};


//randoms con child process
/*
function getRandom(req,res){
    const cantidad = Number(req.query.cant);
    try{
        //traigo el archivo child 
        const createRandoms = fork('../src/utils/randomNumbers.js')
        //paso cantidad al child
        createRandoms.send(cantidad);
        //esucha evento message del child trae la respuesta y envia al cliente
        createRandoms.on('message', random => res.send(random))
    }catch(err){logger.warn(err)}
};
*/



//*==================================[LOGOUT]======================================*//


function getLogout(req,res) {
    req.logout()
    res.redirect('/')
}

//*==================================[NO MATCH *]======================================*//

function noMatch(req, res){
    res.sendFile(path.join(process.cwd(),'../public/404.html'))

}


export default {
    getInitial,
    getLogin,
    getLoginError,
    getRegister,
    getRegisterError,
    getProducts,
    getInfo,
    getRandom,
    getLogout,
    noMatch
}