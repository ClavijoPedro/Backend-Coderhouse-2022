import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

class ContenedorMongoDB {
    
    constructor(config, model, schema){
        this.connection = config;
        this.model = mongoose.model(model, schema);  
    }


    async connectDB(){
        try{
            await mongoose.connect(this.connection)
            .then(() => logger.info('MongoDB connected'))
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
            await this.connectDB()
            const items = await this.model.find()
            return items;
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }


    async listById(id){
        try{
            await this.connectDB()
            const item = await this.model.findOne({_id: id});
            return item;
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }

    async listOne(itm){
        try{
            await this.connectDB()
            const item = await this.model.findOne(itm);
            return item;
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }


    async save(itm){
        try{
           await this.connectDB()
           const model = this.model
           const item = new model(itm); 
           await item.save()
           logger.info(`item agregado id: ${item._id}`) 
           return item.id
        }
        catch(error){ logger.error(error) }
        finally{
            this.disconnect()
        };
    }


    async updateById(id, itmUpdate){
        try{
            await this.connectDB()
            await this.model.updateOne({_id:id}, {$set: itmUpdate})
            .then((res) => logger.info(res))
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }


    async deleteById(id){
        try{
            await this.connectDB()
            await this.model.deleteOne({_id:id})
            .then((res) => logger.info(res)) 
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }

    
    async deleteAll(){
        try{
            await this.connectDB()
            await this.model.deleteMany({ })
            .then((res) => logger.info(res)) 
        }
        catch(error){ logger.error(error) }
        finally{this.disconnect()};
    }
}


export default ContenedorMongoDB