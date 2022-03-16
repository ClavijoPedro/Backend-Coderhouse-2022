const  mongoose  = require('mongoose');
require('../../dataBases/mongoDB/mongoDB');


class ContenedorMongoDB {
    
    constructor(model){
        this.model = model; //paso model por props

    }


    async disconnect(){
        try{
            await mongoose.connection.close()
        }catch(err){ console.log(err)}
    }


    async listAll(){
        try{
            const items = await this.model.find()
            console.log(items)
            return items;
        }
        catch(error){ console.error(error)}
    }


    async listById(id){
        try{
            const item = await this.model.find({_id: id});
            console.log(item)
            return item;
        }
        catch(error){ console.error(error) };
    }


    async save(itm){
        try{
           const model = this.model
           const item = new model(itm);
           console.log(await item.save()) 
        }
        catch(error){ console.error(error)};
    }


    async updateById(id, itmUpdate){
        try{
            const update = await this.model.updateOne({_id:id}, {$set: itmUpdate});
            console.log(update)
        }
        catch(error){ console.error(error)};

    }


    async deleteById(id){
        try{
            await this.model.deleteOne({_id: id}); 
         }
         catch(error){ console.error(error)};
    }

    
    async deleteAll(){
        try{
            await this.model.deleteMany() 
         }
         catch(error){ console.error(error)};
    }
}


module.exports = ContenedorMongoDB