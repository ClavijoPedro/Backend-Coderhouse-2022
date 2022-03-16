class ContenedorMem {

    contructor(){
        this.list = []
    }

    listAll(){
        return this.list;
    }

    listById(id){
        const list = this.list;
        const item = list.find(itm => itm.id === id);
        return item;
    }

    save(item){
        this.list = [...this.list, item]
    }


    updateById(id, itmUpdate){
        const list = this.list;
        const code = Date.now();
        const date = new Date().toLocaleString();
        const index = list.findIndex(itm => itm.id === id);
        const item = list[index];
        const newItem = 
            {
                name: itmUpdate.name ? itmUpdate.name : item.name,
                description: itmUpdate.description ? itmUpdate.description : item.description,
                price: itmUpdate.price ? itmUpdate.price : item.price,
                stock: itmUpdate.stock ? itmUpdate.stock : item.stock,
                image: itmUpdate.image ? itmUpdate.image : item.image,
                date: date,
                id: id,
                code:code
            };
        this.list[index] = newItem;
    }


    deleteById(id){
        const list = this.list;
        const newList = list.filter(itm => itm.id !== id);
        this.list = newList;
    }

    
    deleteAll(){
        this.list = [];
    }
}


module.exports = ContenedorMem;