import { Document } from "mongoose";

export interface Productos extends Document{
    readonly name: string 
    readonly description: string 
    readonly price: number 
    readonly stock: number
    readonly image: string 
}
