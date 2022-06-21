import {productsDao} from '../daos/daoFactory.js'
import ProductDTO from '../dto/ProductDTO.js';


class ProductsRepository{
    constructor(){
        this.dao = productsDao;
    }

    async getAll(){
        const dtos = await this.dao.listAll();
        return dtos.map(dto => new ProductDTO(dto));
    }

    async getById(id){
        const dto = await this.dao.listById(id);
        return new ProductDTO(dto);
    }

    async add(prod){
        console.log(prod)
        const dto = new ProductDTO(prod);
        const addedProduct = await this.dao.save(dto);
        return addedProduct
    }

    async updateById(id, update){
        const updatedProduct = await this.dao.updateById(id, update);
        return updatedProduct
    }

    async deleteById(id){
        const dto = await this.dao.deleteById(id);
        return dto
    }
    
}


export default ProductsRepository;