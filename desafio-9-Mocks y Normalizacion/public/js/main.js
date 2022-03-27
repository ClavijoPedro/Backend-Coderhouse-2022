const socket = io();

// form mensajes---------------------------------------------------------------------

const date = new Date().toLocaleString()
const chatScroll = document.getElementById('mensajes');

//traigo los datos del userForm y los emito
const messagesForm = document.getElementById('msjsForm');
messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = {
        author: {
            email:document.getElementById('userMail').value,
            nombre:document.getElementById('userName').value,
            apellido:document.getElementById('userLastName').value,
            edad:document.getElementById('userAge').value,
            alias:document.getElementById('userAlias').value,
            avatar:document.getElementById('userAvatar').value,
        },
        text: document.getElementById('userMsj').value
    };
    console.log(userMessage)
    socket.emit('newMessage', userMessage);
    chatScroll.scrollTop = chatScroll.scrollHeight;
    messagesForm.reset();
})


//creo esquemas
const author = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const text = new normalizr.schema.Entity('text', { author: author },{ idAttribute: 'id' });
const chat = new normalizr.schema.Entity('chat', {
  authors: [author],
  messages: [text]
}, { idAttribute: 'id' });


// capturo el evento messages y lo renderizo
socket.on('messages', msjs => {

    //desnomarlizo 
    const denormalizeChat = normalizr.denormalize(msjs.result, chat, msjs.entities);
    let originalData = JSON.stringify(denormalizeChat).length; 
    let normalizedData = JSON.stringify(msjs.entities).length;
    let compression = ((normalizedData * 100) / originalData).toFixed(2);
    document.getElementById('compression').innerHTML = `Compresión de mensajes: ${compression}% `

    //creo el html de mensaje
    const msj = denormalizeChat.messages.map(m => {
       return(`   
            <div class="uMsj mb-2 rounded text-end bg-light p-2">
                <p class="m-0 msjData">
                    <small>
                        <b>${m.date}</b>
                        <span>${m.author.email}</span>
                    </small>
                </p>
                <p class="m-0 msjText">
                    <i>${m.text}</i>
                </p> 
                <img class="avatar" src="${m.author.avatar}" alt="avatar"></img>   
            </div>
        `)
    });
    document.getElementById('mensajes').innerHTML = msj
});






