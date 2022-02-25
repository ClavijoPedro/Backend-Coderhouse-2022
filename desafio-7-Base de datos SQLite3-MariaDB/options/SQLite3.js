const optionsSQL3 = {
    client: 'sqlite3', 
    connection: {
        filename: `${__dirname}/DB/ecommerce.sqlite` 
    },
    useNullAsDefault: true //pone null a las celdas que quedan vacias
}


module.exports = {
    optionsSQL3
}
