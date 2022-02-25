const { optionsMDB } = require('./options/mariaDB');
const knex = require('knex')(optionsMDB);

//creo nueva tabla
knex.schema.createTable('products', table => {
    table.increments('id').primary().notNullable()
    table.string('name').notNullable()
    table.integer('price') 
    table.string('image').notNullable()
})
.then(() => console.log('tabla productos creada'))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})


