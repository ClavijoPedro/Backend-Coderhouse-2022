const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

const Api = require('./api');
const api = new Api();

// end points
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/productos', (req, res) => {
    res.render('products', {products: api.prodList()});
});

app.post('/productos', (req, res) => {
    api.addProd(req.body)
    res.redirect('/');
});


// defino view engine y el path del view
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public')); // sin la linea no funcionan los estilos

// server config
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));