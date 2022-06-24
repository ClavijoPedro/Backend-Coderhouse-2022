import { Controller, Get, Post, Put, Delete, Req, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateProductoDto } from './dto/product.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {

    constructor(private productosService: ProductosService){}

    @Get()
    async getproducts(@Res() res,@Req() req, @Param('id?') id){
        const productos = await this.productosService.getProducts() 
        return res.status(HttpStatus.OK).json({
            productos
        })

    }
    @Get('/:id')
    async getproduct(@Res() res, @Param('id') id){
        const product = await this.productosService.getProductById(id) 
        return res.status(HttpStatus.OK).json({
            product
        })

    }

    @Post()
    async createProduct(@Res() res, @Body() createProductoDto: CreateProductoDto) {
        const product = await this.productosService.createProduct(createProductoDto)
        return res.status(HttpStatus.OK).json({
            product
        });
    }

    @Put('/:id')
    async updateProducts(@Res() res, @Param('id') id, @Body() createProductoDto: CreateProductoDto) {
        const updatedProduct = await this.productosService.updateProduct(id, createProductoDto)
        return res.status(HttpStatus.OK).json({
          updatedProduct
        });
    }

    @Delete('/:id')
    async deleteProducts(@Res() res, @Param('id') id) {
        const deleted = await this.productosService.deleteProduct(id)
        return res.status(HttpStatus.OK).json({
          deleted
        });
    }
}
