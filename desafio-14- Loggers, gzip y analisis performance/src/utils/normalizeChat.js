import {normalize, schema} from 'normalizr';
import printObject from './printObject.js';


const author = new schema.Entity('author', {}, { idAttribute: 'email' });
const text = new schema.Entity('text', { author: author },{ idAttribute: 'id' });
const chat = new schema.Entity('chat', {
  authors: [author],
  messages: [text]
}, { idAttribute: 'id' });


//Normalizo
function normalizeChat(messages) {

  //mapeo las props que requiero de la data de mongoDB 
  const data = messages.map((msj) => ({
    author: msj.author,
    date: msj.createdAt.toLocaleString(),
    text: msj.text,
    id: msj.id,
  }));

  //creo objeto le paso id y data en props, normalizo
  const normalizedData = normalize(
    { id: 'mensajes', messages: data },
    chat
  );
  
  //imprimo el resultado en consola
  // printObject(normalizedData)

  return normalizedData
};


export {normalizeChat}

