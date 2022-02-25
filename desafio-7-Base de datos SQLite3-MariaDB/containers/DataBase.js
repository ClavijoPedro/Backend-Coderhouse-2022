const { optionsSQL3 } = require('../options/SQLite3');// traigo las options y un knex x cada motor
const { optionsMDB } = require('../options/mariaDB');
const knexSQL3 = require('knex')(optionsSQL3);
const knexMADB = require('knex')(optionsMDB);

class DataBase {

    constructor(options, tbleName){//designa el motor segun la propiedad client de  options que pase
        this.knex = options.client == 'sqlite3' ? knexSQL3 : knexMADB; 
        this.tbleName = tbleName;
    }


    listData(){
        return this.knex.from(this.tbleName).select('*')
            .then(data => JSON.stringify(data)) //  JSON.parse(JSON.stringify(data))
            // .then((data) => console.log(data))
            .catch((err) => {console.log(err); throw err})
            // .finally(() => knex.destroy())

    }
    
    
    saveData(obj){
        console.log(obj)
        this.knex(this.tbleName).insert(obj)
            .then(() => console.log('data insertada'))
            .catch((err) => {console.log(err); throw err})
            // .finally(() => knex.destroy())

    }
}

module.exports = DataBase