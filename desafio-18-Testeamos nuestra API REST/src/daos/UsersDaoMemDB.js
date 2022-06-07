import logger from "../utils/logger.js";
import DAO from "./DAO.js";

let instance = null;

class UsersDaoMemDB extends DAO{
    
    constructor(){
        super();
        this.db = [];
    }

    //singleton
    static getInstance(){
        if(!instance){
            instance = new UsersDaoMemDB()
        }
        return instance
    }

    listAll(){
        try{
            this.db.forEach((e) => console.log(e))
            return this.db;
        }
        catch(error){ logger.error(error) }
    }


    listById(id){
        try{
            const item = this.db.find(itm => itm.id == id);
            return item;
        }
        catch(error){ logger.error(error) }
    }

    listOne(itm){
        try{
            const item = this.db.find(i => i == itm);
            return item;
        }
        catch(error){ logger.error(error) }
    }


    save(itm){
        try{
           this.db.push(itm)
           logger.info(`item agregado id: ${itm.id}`) 
           return itm.id
        }
        catch(error){ logger.error(error) }
    }


    updateById(id, itmUpdate){
        try{
            const db = this.db;
            const index = db.findIndex(itm => itm.id === id);
            console.log(index)
            db[index] = itmUpdate;
            console.log(this.db[2].name)
        }
        catch(error){ logger.error(error) }
    }


    deleteById(id){
        try{
            this.db.filter(itm => itm.id != id);
        }
        catch(error){ logger.error(error) }
    }

    
    deleteAll(){
        try{
           this.db = []
        }
        catch(error){ logger.error(error) }
    }
}


export default UsersDaoMemDB