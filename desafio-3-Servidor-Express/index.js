const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./contenedor');

const products = new Contenedor('./products.txt');

app.get('/', (req, res) => {
    res.send(`Desafio Servidor Express`)
})

app.get('/productos', (req, res) => {
    res.send(products.list());
});

app.get('/productoRandom', (req, res) => {
    res.send(products.prodRandom());
});


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})