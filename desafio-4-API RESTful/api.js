let counter = 0;

class Api{
    constructor(){
        this.products = [];
    }

    prodList(){
        return this.products
    }

    getProd(id){
        const prodId = parseInt(id); //transformo a number el id
        const prodList = this.products;
        const product = prodList.find(prod => prod.id === prodId);
        return JSON.stringify(product);
    }

    addProd(obj){
        const id = counter++;
        const product = obj;
        product.id = id;
        this.products = [...this.products, product]
        return JSON.stringify(product);
    }

    updateProd(id, objUpdate){
        const prodList = this.products;
        const prodId = parseInt(id); 
        const update = objUpdate;
        const product = prodList.find(p => p.id === prodId);
        product.name = update.name;
        product.price = update.price;
        product.color = update.color;
        return JSON.stringify(product);
    }
    
    deleteProd(id){
        const prodId = parseInt(id) ;
        const prodList = this.products;
        const newProdList = prodList.filter(p => p.id !== prodId)
        this.products = newProdList;
    }
}

module.exports = Api
