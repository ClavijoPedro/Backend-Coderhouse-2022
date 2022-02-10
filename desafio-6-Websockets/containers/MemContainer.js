class MemContainer{
    constructor(){
        this.products = [];
        this.id = 0;
    }

    prodList(){
        return this.products
    }

    getProd(id){
        const prodId = parseInt(id); //transformo a number el id
        const prodList = this.products;
        const product = prodList.find(prod => prod.id === prodId);
        return product
    }

    addProd(obj){
        const id = this.id++;
        const product = obj;
        product.id = id;
        this.products = [...this.products, product]
        return product
    }

    updateProd(id, objUpdate){
        const prodList = this.products;
        const prodId = parseInt(id); 
        // const update = objUpdate;
        const product = prodList.find(p => p.id === prodId);
        product = objUpdate
        // product.name = update.name;
        // product.price = update.price;
        // product.color = update.color;
    }
    
    deleteProd(id){
        const prodId = parseInt(id) ;
        const prodList = this.products;
        const newProdList = prodList.filter(p => p.id !== prodId)
        this.products = newProdList;
    }
}

module.exports = MemContainer