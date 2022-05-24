import { logger } from "../utils/logger.js"
export default function(req,res,next){
    logger.warn(`Ruta: ${req.url} metodo: ${req.method} inexistente `)
}