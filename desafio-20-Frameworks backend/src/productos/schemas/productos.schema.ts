import { Schema } from 'mongoose'

export const ProductosSchema = new Schema({
    name: String, 
    description: String, 
    price: Number, 
    stock: Number,
    image: String, 
})