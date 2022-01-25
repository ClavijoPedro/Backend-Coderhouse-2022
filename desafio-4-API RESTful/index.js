const express = require('express');
const { Router } = express;
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = Router();

const Api = require('./api');
const api = new Api();

products.get('/', (req, res) => {
    const products = api.prodList();
    res.send(products.length ? products : {lista: 'vacia'});
});

products.post('/', (req, res) => {
    console.log(req.body)
    res.send(api.addProd(req.body));
});

products.get('/:id', (req, res) => {
    const prod = api.getProd(req.params.id);
    res.send(prod ? prod : {error : 'producto no encontrado'});
})

products.put('/:id', (req, res) => {
    const prodId = req.params.id
    const update = req.body
    res.send(api.updateProd(prodId, update));
})

products.delete('/:id', (req, res) => {
    const prodId = req.params.id;
    res.send(api.deleteProd(prodId));
})

app.use('/api/productos', products);
app.use('/static', express.static('public'));


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
}).on('error', error => console.log(`Error en servidor ${error}`));