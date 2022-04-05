import mongoose from 'mongoose';

class ContenedorMongoDB {
    
    constructor(config, schema){
        this.connection = config;
        this.model = mongoose.model('chat', schema);  
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


    async save(msj){
        try{
           await this.connectDB()
           const model = this.model
           const item = new model(msj); 
           await item.save()
           console.log(`mensaje agregado id: ${item._id}`) 
        }
        catch(error){ console.error(error)}
        finally{
            this.disconnect()
        };
    }

}


export default ContenedorMongoDB