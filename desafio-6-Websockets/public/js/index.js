const socket = io()

const formProducto = document.querySelector('#prodForm');
formProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = {
        name: document.querySelector('#prodName').value,
        price: document.querySelector('#prodPrice').value,
        image: document.querySelector('#prodImg').value
    };
    socket.emit('newProduct', producto);
    formProducto.reset()
});

// function productTable(products) {
//     return fetch('views/prodTable.hbs')
//         .then(respuesta => respuesta.text())
//         .then(plantilla => {
//             const template = Handlebars.compile(plantilla);
//             const html = template({ products })
//             return html
//         })
// }


const tableTemplate = Handlebars.compile(`
    {{#if products.length}}
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Foto</th>
            </tr>
          </thead>
          <tbody>
            {{#each products }}
                <tr>
                    <td class="align-middle">{{this.name}}</td>
                    <td class="align-middle">{{this.price}}</td>
                    <td class="align-middle"><img class="tblImg" src="{{this.image}}" alt="prodImg"></td>
                </tr>
            {{/each}}      
          </tbody>
        </table>
        {{else}}
            <h5 class="mb-5 bg-light p-5 rounded">No hay productos</h5>
    {{/if}}
`);

socket.on('listaProductos', prod => {
    document.getElementById('productos').innerHTML = tableTemplate({products: prod})
})


