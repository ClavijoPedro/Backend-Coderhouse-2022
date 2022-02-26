
class DataBase {

    constructor(options, tbleName){//designa el motor segun la propiedad client de  options que pase
        this.knex = options;
        this.tbleName = tbleName;
    }


    async listData(){
        try{
            let res = await this.knex.from(this.tbleName).select('*')
            return res
        }catch(err){console.log(err)}
    }
    
    
    async saveData(obj){
        try{
            await this.knex(this.tbleName).insert(obj)
                console.log('data insertada')
                // .finally(() => this.knex.destroy())
        }catch(err){console.log(err)}
    }
}

module.exports = DataBase