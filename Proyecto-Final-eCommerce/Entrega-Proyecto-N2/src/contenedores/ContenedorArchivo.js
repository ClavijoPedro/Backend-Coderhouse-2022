const fs = require('fs');

class ContenedorArchivo {
    
    constructor(route){
        this.route = route;
    }


    listAll(){
        try{
            const itemList =  fs.readFileSync(this.route, 'utf-8')
            return JSON.parse(itemList);
        }catch(err){
            throw new Error(`No se encontro la lista error: ${err}`);
        }
    }


    getProdById(id){
        const itemList = this.listAll();
        const item = itemList.find( itm => itm.id === Number(id));
        return item
    }


    saveProd(item){
        const itemList = this.listAll();
        const id = itemList.length == 0 ? 1 : itemList[itemList.length - 1].id + 1; //porque el length del array da 1 pero la posicion del item en el array es 0
        const code = Date.now();
        const date = new Date().toLocaleString();
        const description = 'verdura'; //esta harcodeado este vendria del req.body originalmente
        const itemWithId = {...item, date, id, code}
        const newItemList = [...itemList, itemWithId]
        try{
            fs.writeFileSync(this.route, JSON.stringify(newItemList, null, 4));
        }catch(err){
            throw new Error(`no se pudo guardar el item error: ${err}`);
        }
    }


    updateProdById(id, itmUpdate){
        const itemList = this.listAll();
        const code = Date.now();
        const date = new Date().toLocaleString();
        const index = itemList.findIndex( itm => itm.id === id);
        if(index < 0){
            throw new Error(`No se encuentra el producto`);
        }else{
            const item = itemList[index];
            const newItem = {
                name: itmUpdate.name ? itmUpdate.name : item.name,
                description: itmUpdate.description ? itmUpdate.description : item.description,
                price: itmUpdate.price ? itmUpdate.price : item.price,
                stock: itmUpdate.stock ? itmUpdate.stock : item.stock,
                image: itmUpdate.image ? itmUpdate.image : item.image,
                date: date,
                id: id,
                code:code
            }
            itemList[index] = newItem;
            try{
                fs.writeFileSync(this.route, JSON.stringify(itemList, null, 4));
            }catch(err){
                throw new Error(`No se pudo actualizar el item erro: ${err}`);
            }
        }
    }


    deleteProdById(id){
        const itemList = this.listAll();
        const newItemList = itemList.filter(itm => itm.id !== id);
        try{
            fs.writeFileSync(this.route, JSON.stringify(newItemList, null, 4))
        }catch(err){
            throw new Error(`no se pudo eliminar el item error: ${err}`);
        }
    }

    
    deleteAll(){
        const itemList = [];
        try{
            fs.writeFileSync(this.route, JSON.stringify(itemList, null, 4));
        }catch(err){
            throw new Error(`no se pudo eliminar la lista de items error: ${err}`);
        }
    }
}

module.exports = ContenedorArchivo