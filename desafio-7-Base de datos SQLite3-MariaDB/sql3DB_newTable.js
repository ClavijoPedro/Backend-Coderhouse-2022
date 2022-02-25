const { optionsSQL3 } = require('./options/SQLite3');
const knex = require('knex')(optionsSQL3);

//creo nueva tabla
knex.schema.createTable('chat', table => {
    table.increments('id').primary().notNullable()
    table.string('date')
    table.string('email').notNullable()
    table.string('message').notNullable()
})
.then(() => console.log(`tabla de mensajes creada`))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})
