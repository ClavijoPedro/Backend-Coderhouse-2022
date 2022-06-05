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
        await this.dao.save(dto);
    }

    async updateById(id, update){
        const dto = new ProductDTO(update);
        await this.dao.updateById(id, dto);
    }

    async deleteById(id){
        const dto = await this.dao.deleteById(id);
        return new ProductDTO(dto);
    }
    
}


export default ProductsRepository;