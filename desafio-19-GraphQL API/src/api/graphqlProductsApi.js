import ProductsRepository from "../repositories/ProductsRepository.js";

const products = new ProductsRepository();

const getProducts = async ({id}) => {
    const productsList = await products.getAll()
    if(id){
        return productsList.filter(p => p.id == id);
    }
    return productsList;
}

const createProduct = async ({data}) => {
    const product = await products.add(data);
    return product
}

const updateProduct = async ({id, data}) => {
    if(!id){
        throw new Error('Producto no encontrado se necesita un ID')
    }
    const updatedProduct = await products.updateById(id, data);
    return updatedProduct
}

const deleteProduct = async ({id}) => {
    if(!id){
        throw new Error('Producto no encontrado se necesita un ID')
    }
    const deletedProduct = await products.deleteById(id);
    console.log('deletedProduct', deletedProduct)
    return deletedProduct
}

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}