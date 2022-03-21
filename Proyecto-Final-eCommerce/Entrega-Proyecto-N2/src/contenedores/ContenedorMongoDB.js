import mongoose from 'mongoose';

class ContenedorMongoDB {
    
    constructor(config, model, schema){
        this.connection = config;
        this.model = mongoose.model(model, schema);  
    }


    async connectDB(){
        try{
            await mongoose.connect(this.connection)
            .then(() => console.log('MongoDB connected'))
        }catch(error){ console.log(error)}
    }


    async disconnect(){    
        try{
            await mongoose.connection.close()
            .then(() => {
                console.log('MongoDB disconnected', mongoose.connection.readyState)})
        }catch(err){ console.log(err)}
    }


    async listAll(){
        try{
            await this.connectDB()
            const items = await this.model.find()
            console.log("Items:\n",items.productos)
            return items;
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }


    async listById(id){
        try{
            await this.connectDB()
            const item = await this.model.findOne({_id: id});
            console.log("Items:\n", item.productos)
            return item;
        }
        catch(error){ console.error(error) }
        finally{this.disconnect()};
    }


    async save(itm){
        try{
           await this.connectDB()
           const model = this.model
           const item = new model(itm); 
           await item.save()
           console.log(`item agregado id: ${item._id}`) 
        }
        catch(error){ console.error(error)}
        finally{
            this.disconnect()
        };
    }


    async updateById(id, itmUpdate){
        try{
            await this.connectDB()
            await this.model.updateOne({_id:id}, {$set: itmUpdate})
            .then((res) => console.log(res))
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }


    async deleteById(id){
        try{
            await this.connectDB()
            await this.model.deleteOne({_id:id})
            .then((res) => console.log(res)) 
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }

    
    async deleteAll(){
        try{
            await this.connectDB()
            await this.model.deleteMany({ })
            .then((res) => console.log(res)) 
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }
}


export default ContenedorMongoDB