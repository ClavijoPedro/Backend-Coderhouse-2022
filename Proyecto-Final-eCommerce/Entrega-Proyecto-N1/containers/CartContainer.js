const { json } = require('express/lib/response');
const fs = require('fs');

class CartContainer{

    constructor(file){
        this.file = file;
    }
    
    listAllCarts(){
        try{
            const carts = fs.readFileSync(this.file, 'utf-8')
            return JSON.parse(carts)
        }catch(err){
            throw new Error(`No se encuentran los carritos error: ${err}`);
        }
    }

    newCart(){
        const cartsList = this.listAllCarts();
        const id = Date.now();
        const date = new Date().toLocaleString();
        const cart = { 
            id: id,
            date: date,
            products: [] 
        };
        const newCartsList = [...cartsList, cart]
        try{
            fs.writeFileSync(this.file, JSON.stringify(newCartsList, null, 3));
            return id
        }catch(err){
            throw new Error(`No se pudo crear el carrito ${err}`);
        }
    }


    deleteById(id){
        const cartsList = this.listAllCarts();
        const newCartsList = cartsList.filter(cart => cart.id !== id);
        try{
            fs.writeFileSync(this.file, JSON.stringify(newCartsList, null, 3))
        }catch(err){
            throw new Error(`no se pudo eliminar el carrito error: ${err}`);
        }
    }

    listAllProducts(id){
        const cartList = this.listAllCarts();
        try{
            const cart = cartList.find(cart => cart.id === id);
            return cart.products;
        }catch (err){
            throw new Error(`no se encuentran los productos error: ${err}`)
        }
    }
    
    saveInCart(cartId, prodId){
        const cartList = this.listAllCarts(); //traigo todos los carritos
        try{
            const index = cartList.findIndex( cart => cart.id === cartId); //ubico la posicion del carrito en el array de carts
            const productList = JSON.parse(fs.readFileSync('./containers/products.json', 'utf-8')); //traigo la lista de productos
            const product = productList.find(p => p.id === prodId);//busco el producto segun el id del req.body del obj que paso por postman
            // cartList[index].products.push(product);//pusheo el producto al carrito 
            const cart = cartList[index].products; //ubico el carrito con el index y accedo a su propiedad products []
            product.id = cart.length == 0 ? 1 : cart[cart.length - 1].id + 1; //asigno un id actualizado al producto cuando pasa al carrito
            cart.push(product); //guardo el producto en  el carrito
            fs.writeFileSync(this.file, JSON.stringify(cartList, null, 3));//guardo la lista con el carrito actualizado
        }catch(err){
            throw new Error(`no se pudo guardar el producto en el carrito error: ${err}`);
        }
    }

    deleteById(idCart, idProd){
        const cartList = this.listAllCarts(); //traigo los carritos
        const index = cartList.findIndex(cart => cart.id === idCart); //busco la posicion del carrito en el array products con el id de req.params
        const newProdList= cartList[index].products.filter(prods => prods.id !== idProd); // ubico el carrito con el index y accedo a su propiedad products y filtro para eliminar el producto[]
        cartList[index].products = newProdList //asigno lanueva lista de productos
        try{
            fs.writeFileSync(this.file, JSON.stringify(cartList, null, 3)); //actualizo el cart.json 
        }catch(err){
            throw new Error(`no se pudo eliminar el item error: ${err}`);
        }
    }
}

module.exports = CartContainer