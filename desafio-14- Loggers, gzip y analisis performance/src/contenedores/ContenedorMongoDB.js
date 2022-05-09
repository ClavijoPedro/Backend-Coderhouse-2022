import mongoose from 'mongoose';

class ContenedorMongoDB {
    
    constructor(config, modelName, schema){
        this.connection = config;
        this.model = mongoose.model(modelName, schema);  
    }

    //metodo para pasasr a mongoStore (connect-mongo)
    connection(){
        return  this.connection
    }
    
    async connectDB(){
        try{
            await mongoose.connect(this.connection)
            // .then(() => console.log('MongoDB connected'))
        }catch(error){ console.log(error)}
    }


    async disconnect(){    
        try{
            await mongoose.connection.close()
            // .then(() => {
                // console.log('MongoDB disconnected', mongoose.connection.readyState)})
        }catch(err){ console.log(err)}
    }


    async listAll(){
        try{
            await this.connectDB()
            const items = await this.model.find()
            return items;
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }

    async listOne(itm){
        try{
            await this.connectDB()
            const item = await this.model.findOne(itm)
            return item
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }
    
    async findId(id){
        try{
            await this.connectDB()
            const item = await this.model.findById(id)
            return item
        }
        catch(error){ console.error(error)}
        finally{this.disconnect()};
    }

    async save(msj){
        try{
           await this.connectDB()
           const model = this.model
           const item = new model(msj); 
           await item.save()
        }
        catch(error){ console.error(error)}
        finally{
            // this.disconnect()
        };
    }

}


export default ContenedorMongoDB