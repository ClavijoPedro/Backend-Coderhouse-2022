const socket = io();

//traigo los datos del productForm y los emito
const productForm = document.getElementById('prodForm');
productForm.addEventListener('submit', e => {
    e.preventDefault();
    const newProduct = {
        name: document.getElementById('prodName').value,
        price: document.getElementById('prodPrice').value,
        image: document.getElementById('prodImg').value
    };
    socket.emit('newProduct', newProduct);
    productForm.reset();
});

// traigo el template hbs de la carpeta template
function tableTemplate(prod) {
    return fetch('templates/table.hbs')
    .then(res => res.text())
    .then(temp => {
        const template = Handlebars.compile(temp);
        const table = template({products: prod});
        return table
    });
};

//capturo la lista, cargo los productos al template y renderizo
socket.on('productList', product => {
    console.log(product)
    tableTemplate(product).then( temp => {
        document.getElementById('productos').innerHTML = temp})
});


// form mensajes---------------------------------------------------------------------

const date = new Date().toLocaleString()
const chatScroll = document.getElementById('mensajes');

//traigo los datos del userForm y los emito
const messagesForm = document.getElementById('msjsForm');
messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = {
        date: date,
        email: document.getElementById('userMail').value,
        message: document.getElementById('userMsj').value
    };
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
                        <b>${m.date}</b>
                        <span>${m.email}</span>
                    </small>
                </p>
                <p class="m-0 msjText">
                    <i>${m.message}</i>
                </p>    
            </div>
        `)
    });
    document.getElementById('mensajes').innerHTML = msj
});






