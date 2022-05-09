import { normalizeChat } from '../utils/normalizeChat.js';
import MensajesDaoMongoDB from '../daos/MensajesDaoMongoDB.js';
import { logger } from '../utils/logger.js';


//instancio containers de chat
const mensajesDao = MensajesDaoMongoDB;




async function webSockets (socket) {
    logger.info('usuario conectado!');
    
    //traigo data de chat, normalizo y saco compresion
    const messages = await mensajesDao.listAll()
    
    if(messages){
        try{
            // emito evento con la lista de mensajes normalizada
            socket.emit('messages', normalizeChat(messages));
            
            // capturo el mensaje emitido del lado del cliente, guardo y propago
            socket.on('newMessage', async msj => {
                await mensajesDao.save(msj);
                const newMessages = await mensajesDao.listAll()
                io.sockets.emit('messages', normalizeChat(newMessages));
            });

        }catch(err){logger.error(err)}
    }
};


export default {
    webSockets
};