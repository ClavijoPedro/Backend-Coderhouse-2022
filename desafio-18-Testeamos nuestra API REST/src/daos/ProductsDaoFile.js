import { promises as fs } from 'fs';
import logger from '../utils/logger.js';
import DAO from './DAO.js';


let instance = null;

class ProductsDaoFile extends DAO {
    
    constructor(file){
        super();
        this.file = './db/products.json';      
    };

    //singleton
    static getInstance(){
        if(!instance){
            instance = new ProductsDaoFile()
        }
        return instance
    };

    async listAll(){
        try{
            const itemList = await fs.readFile(this.file, 'utf-8')
            // logger.info('esto es item list',itemList)
            return JSON.parse(itemList)
        }catch(err){
            if(err.code === 'ENOENT'){
                await fs.writeFile(this.file, JSON.stringify([]))
            }else{
                logger.error(err)
            }
        }
    };


    async listById(id){
        try{
            const itemList = await this.listAll();
            const item = itemList.find( itm => itm.id === Number(id));
            // logger.info('Item:\n',item)
            return item
        }catch(err){ logger.error(err)}
    };

    async listOne(itm){
        try{
            const list = await this.listAll();
            const item = list.find(i => i == itm)
            return item
        }catch(err){logger.error(err)}
    };


    async save(itm){
        try{
            const itemList = await this.listAll();
            const id = itemList.length == 0 ? 1 : itemList[itemList.length - 1].id + 1; //porque el length del array da 1 pero la posicion del item en el array es 0
            const code = Date.now();
            const timestamp = new Date().toLocaleString();
            const newItem = {...itm, timestamp, id, code}
            const newItemList = [...itemList, newItem]
            await fs.writeFile(this.file, JSON.stringify(newItemList, null, 4));
            // logger.info('Item  guardado:\n', newItem)
            return id
        }catch(err){
            logger.error(`no se pudo guardar el item error: ${err}`);
        }
    };


    async updateById(id, itmUpdate){
        try{
            const itemList = await this.listAll();
            const index = itemList.findIndex( itm => itm.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra el producto`);
            }else{
                const item = itemList[index];
                const newItem = Object.assign({},item, itmUpdate);
                itemList[index] = newItem;
                await fs.writeFile(this.file, JSON.stringify(itemList, null, 4));
                return {status:'Producto Actualizado', id:id};
            }
        }catch(err){
            logger.error(`No se pudo actualizar el item erro: ${err}`);
        } 
    };


    async deleteById(id){
        try{
            const itemList = await this.listAll();
            const newItemList = itemList.filter(itm => itm.id !== Number(id));
            await fs.writeFile(this.file, JSON.stringify(newItemList, null, 4))
            return {status:'Producto eliminado', id:id}//para mostrar server response en consola
        }catch(err){
            logger.error(`no se pudo eliminar el item error: ${err}`);
        }
    };

    
    async deleteAll(){
        const itemList = [];
        try{
            await fs.writeFile(this.file, JSON.stringify(itemList, null, 4));
        }catch(err){
            logger.error(`no se pudo eliminar la lista de items error: ${err}`);
        }
    };
};

export default ProductsDaoFile;