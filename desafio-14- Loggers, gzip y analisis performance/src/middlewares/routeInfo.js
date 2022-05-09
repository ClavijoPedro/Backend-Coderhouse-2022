import { logger } from "../utils/logger.js";


export default function (req, res, next){
    logger.info(`Peticion metodo: ${req.method} a Ruta: ${req.url}`)
    next()
}