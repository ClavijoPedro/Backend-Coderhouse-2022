import { promises as fs } from 'fs';


class ContenedorArchivo {
    
    constructor(route){
        this.route = route;
        this.list = this.listAll()
        
    }

    async listAll(){
        try{
            const itemList = await fs.readFile(this.route, 'utf-8')
            console.log('esto es item list',itemList)
            return JSON.parse(itemList)
        }catch(err){
            if(err.code === 'ENOENT'){
                await fs.writeFile(this.route, JSON.stringify([]))
            }else{
                console.log(err)
            }
        }
    }


    async listById(id){
        try{
            const itemList = await this.list;
            const item = itemList.find( itm => itm.id === Number(id));
            console.log('Item:\n',item)
            return item
        }catch(err){ console.log(err)}
    }


    async save(itm){
        try{
            const itemList = await this.listAll();
            const id = itemList.length == 0 ? 1 : itemList[itemList.length - 1].id + 1; //porque el length del array da 1 pero la posicion del item en el array es 0
            const code = Date.now();
            const timestamp = new Date().toLocaleString();
            const newItem = {...itm, timestamp, id, code}
            const newItemList = [...itemList, newItem]
            await fs.writeFile(this.route, JSON.stringify(newItemList, null, 4));
            console.log('Item  guardado:\n', newItem)
            return id
        }catch(err){
            throw new Error(`no se pudo guardar el item error: ${err}`);
        }
    }


    async updateById(id, itmUpdate){
        try{
            const itemList = await this.list;
            const index = itemList.findIndex( itm => itm.id === Number(id));
            if(index < 0){
                throw new Error(`No se encuentra el producto`);
            }else{
                const item = itemList[index];
                const newItem = Object.assign({},item, itmUpdate);
                itemList[index] = newItem;
                await fs.writeFile(this.route, JSON.stringify(itemList, null, 4));
            }
        }catch(err){
            throw new Error(`No se pudo actualizar el item erro: ${err}`);
        } 
    }


    async deleteById(id){
        try{
            const itemList = await this.list;
            const newItemList = itemList.filter(itm => itm.id !== Number(id));
            await fs.writeFile(this.route, JSON.stringify(newItemList, null, 4))
        }catch(err){
            throw new Error(`no se pudo eliminar el item error: ${err}`);
        }
    }

    
    async deleteAll(){
        const itemList = [];
        try{
            await fs.writeFile(this.route, JSON.stringify(itemList, null, 4));
        }catch(err){
            throw new Error(`no se pudo eliminar la lista de items error: ${err}`);
        }
    }
}

export default ContenedorArchivo