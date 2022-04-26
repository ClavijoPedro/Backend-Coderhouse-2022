import { createData } from '../utils/fakeProducts.js'
import config from '../../config.js';
import {fork} from 'child_process';
import {cpus} from 'os';
import path from 'path';


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


async function getData(req,res) {
    try{
        const user = await req.user
        const productos = await createData(5);
        res.render('home', {nombre:user.email, products:productos})
    }catch(err){console.log(err)}
}


function getInfo(req,res){
    const info = {
        argumentos: args,
        sistema: process.platform,
        node: process.version,
        memoria: process.memoryUsage().rss,
        path: process.execPath,
        processID: process.pid,
        folder:process.cwd(),
        cpus: numCPUs
    }
    if(Object.values(info).length){
        res.render('info', {info})
    }
};


function getRandom(req,res){
    const cantidad = Number(req.query.cant);
    //traigo el archivo child 
    const createRandoms = fork('../src/utils/randomNumbers.js')
    //paso cantidad al child
    createRandoms.send(cantidad);
    //esucha evento message del child trae la respuesta y envia al cliente
    createRandoms.on('message', random => res.send(random))
};

//*==================================[LOGOUT]======================================*//


function getLogout(req,res) {
    req.logout()
    res.redirect('/')
}

export default {
    getInitial,
    getLogin,
    getLoginError,
    getRegister,
    getRegisterError,
    getData,
    getInfo,
    getRandom,
    getLogout
}