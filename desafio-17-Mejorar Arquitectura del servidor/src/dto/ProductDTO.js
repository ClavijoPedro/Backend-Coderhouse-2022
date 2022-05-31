class ProductDTO {
    constructor(data){
        this.name = data.name
        this.description = data.description
        this.price = data.price
        this.stock = data.stock
        this.image = data.image
        this.code = data.code
    }
}

export default ProductDTO;