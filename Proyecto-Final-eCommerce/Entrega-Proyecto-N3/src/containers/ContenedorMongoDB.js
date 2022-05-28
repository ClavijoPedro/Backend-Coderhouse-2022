import mongoose from 'mongoose';
import config from '../../config.js';
import logger from '../utils/logger.js';



class ContenedorMongoDB {
    
    constructor(model, schema){
        this.model = mongoose.model(model, schema);
        this.connectDB(config.MONGO_URI);  
    }


    async connectDB(connection){
        try{
            await mongoose.connect(connection)
            // .then(() => logger.info('MongoDB connected'))
        }catch(error){ logger.error(error)}
    }
 

    async disconnect(){    
        try{
            await mongoose.connection.close()
            .then(() => {
                logger.info('MongoDB disconnected', mongoose.connection.readyState)})
        }catch(err){ logger.error(err)}
    }


    async listAll(){
        try{
            const items = await this.model.find()
            return items;
        }
        catch(error){ logger.error(error) }
    }


    async listById(id){
        try{
            const item = await this.model.findOne({_id: id});
            return item;
        }
        catch(error){ logger.error(error) }
    }

    async listOne(itm){
        try{
            const item = await this.model.findOne(itm);
            return item;
        }
        catch(error){ logger.error(error) }
    }


    async save(itm){
        try{
           const model = this.model
           const item = new model(itm); 
           await item.save()
           logger.info(`item agregado id: ${item._id}`) 
           return item.id
        }
        catch(error){ logger.error(error) }
    }


    async updateById(id, itmUpdate){
        try{
            await this.model.updateOne({_id:id}, {$set: itmUpdate})
            .then((res) => logger.info(res))
        }
        catch(error){ logger.error(error) }
    }


    async deleteById(id){
        try{
            await this.model.deleteOne({_id:id})
            .then((res) => logger.info(res)) 
        }
        catch(error){ logger.error(error) }
    }

    
    async deleteAll(){
        try{
            await this.model.deleteMany({ })
            .then((res) => logger.info(res)) 
        }
        catch(error){ logger.error(error) }
    }
}


export default ContenedorMongoDB