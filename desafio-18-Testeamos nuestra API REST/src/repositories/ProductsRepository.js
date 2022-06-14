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
        const id = await this.dao.save(dto);
        return  id
    }

    async updateById(id, update){
        await this.dao.updateById(id, update);
    }

    async deleteById(id){
        const dto = await this.dao.deleteById(id);
        return dto
    }
    
}


export default ProductsRepository;