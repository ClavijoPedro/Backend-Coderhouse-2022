import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Productos } from './interfaces/productos.interface';
import { CreateProductoDto } from './dto/product.dto';

@Injectable()
export class ProductosService {
    constructor(@InjectModel('Productos') private readonly productModel: Model<Productos>){}

    async getProducts(): Promise<Productos[]>{
        const products = await this.productModel.find();
        return products
    }
    
    async getProductById(id:string): Promise<Productos>{
        const product = await this.productModel.findById(id);
        return product
    }

    async createProduct(createProductoDto: CreateProductoDto): Promise<Productos>{
        const product = new this.productModel(createProductoDto);
        return await product.save();
    }

    async updateProduct(id: string, createProductoDto: CreateProductoDto): Promise<Productos>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, createProductoDto, {new:true});
        return updatedProduct

    }

    async deleteProduct(id: string): Promise<Productos>{
        const deletedProduct = await this.productModel.findByIdAndDelete(id)
        return deletedProduct
    }
}
