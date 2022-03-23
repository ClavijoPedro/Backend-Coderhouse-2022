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
            id:document.getElementById('userMail').value,
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

// capturo el evento messages y lo renderizo
socket.on('messages', msjs => {
    console.log(msjs)
   const msj = msjs.map(m => {
       return(`   
            <div class="uMsj mb-2 rounded text-end bg-light p-2">
                <p class="m-0 msjData">
                    <small>
                        <b>${m.createdAt}</b>
                        <span>${m.author.id}</span>
                    </small>
                </p>
                <p class="m-0 msjText">
                    <i>${m.text}</i>
                </p> 
                <img href="${m.author.avatar}" alt="avatar"></img>   
            </div>
        `)
    });
    document.getElementById('mensajes').innerHTML = msj
});






