import  dotenv from 'dotenv';
//MINIMIST importar solo en config sino da conflicto con clusters (da args = undefined)
import minimist from 'minimist'; 
dotenv.config({path: '../.env'});

const options = {alias:{p:'port', m:'modo'}, default:{m:'fork', p:8080}}
const args = minimist(process.argv.slice(2), options)



export default{
    cliArgs: JSON.stringify(args),
    mongoDB: process.env.MONGO_DB_URI,
    PORT: args.port,
    MODO: args.modo
}


