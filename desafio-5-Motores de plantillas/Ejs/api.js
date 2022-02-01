const fs = require('fs');
let counter = 1;

class Api{
    constructor(){
        this.file = "./products.txt";
    }

    prodList(){
        try{
            const products = fs.readFileSync(this.file, "utf-8");
            return JSON.parse(products)
        }
        catch(err){
            console.log(`no se encontraron productos erro: ${err}`);
        }
    }

    getProd(id){
        const prodId = parseInt(id); //transformo a number el id
        try{
            const prodList = this.prodList(); 
            const product = prodList.find(prod => prod.id === prodId);
            return JSON.stringify(product);
        }
        catch(err){
            console.log(`no se pudo encontrar el producto error: ${err}`);
        }
    }

    addProd(prod){
        prod.id = counter++;
        const prodList = this.prodList();
        const newProdList = [...prodList, prod];
        try{
            fs.writeFileSync(this.file, JSON.stringify(newProdList, null, 4));
            return console.log(`producto agregado id: ${prod.id}`);
        }
        catch(err){
            console.log(`no se pudo agregar el producto error: ${err}`);
        }
    }

    updateProd(id, objUpdate){
        const prodList = this.prodList(); //traigo lista
        const prodId = parseInt(id); //paso id a number
        const update = objUpdate; // traigo el nuevo objeto
        const product = prodList.find(p => p.id === prodId); // busco el objeto en la lista
        product.name = update.name;
        product.price = update.price;
        product.image = update.image;
        try{
            const saveUpdate = fs.writeFileSync(this.file, JSON.stringify(prodList, null, 4)); // guardo la lista modificada
            return console.log(`producto actualizado id: ${prodId}`);
        }
        catch(err){
            console.log(`no se pudo actualizar el producto error: ${err}`);
        }
    }
    
    deleteProd(id){
        const prodId = parseInt(id); 
        const prodList = this.prodList();
        const newProdList = prodList.filter(p => p.id !== prodId)
        try{
            const saveNewProdList = fs.writeFileSync(this.file, JSON.stringify(newProdList, null, 4));
            return console.log(`producto eliminado id: ${prodId}`);
        }
        catch(err){
            console.log(`no se elimino el producto erro: ${err}`);
        }
    }
}

module.exports = Api
