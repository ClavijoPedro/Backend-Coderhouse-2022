const express = require('express');
const app = express();
const PORT = 8080;
const exphbs = require('express-handlebars');

app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: 'views'
}));

const Api = require('./api');
const api = new Api();

// end points
app.get('/', (req, res) => {
    res.render('form.hbs')
})

app.get('/productos', (req, res) => {
    res.render('products.hbs', {products: api.prodList()});
});

app.post('/productos', (req, res) => {
    console.log(req.body);
    api.addProd(req.body)
    res.redirect('/');
});


// defino view engine y el path del view
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public')); // sin la linea no funcionan los estilos

// server config
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));