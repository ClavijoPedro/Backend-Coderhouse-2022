import { createData } from '../utils/fakeProducts.js'
import config from '../config/config.js';
import {cpus} from 'os';
import {logger} from '../utils/logger.js'


//argumentos CLI
const args = config.cliArgs;

//nucleos CPU
const numCPUs = cpus().length;


const getProducts = async (req,res) => {
    try{
        const user = await req.user
        const productos = createData(5);
        res.render('home', {nombre:user.email, products:productos})
    }catch(err){logger.error(err)}
}


const getInfo = async (req,res) => {
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


const getRandom = async (req,res) => {
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



export default {
    getProducts,
    getInfo,
    getRandom,
}