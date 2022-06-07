import ProductsDaoFile from "./ProductsDaoFile.js";
import UsersDaoFile from "./UsersDaoFile.js";
import CartDaoFile from "./CartDaoFile.js";
import ProductsDaoMongoDB from "./ProductsDaoMongoDB.js";
import CartDaoMongoDB from "./CartDaoMongoDB.js";
import UsersDaoMongoDB from "./UsersDaoMongoDB.js";
import ProductoSchema from '../models/ProductoSchema.js';
import CarritoSchema from '../models/CarritoSchema.js';
import UserSchema from "../models/UserSchema.js";
import config from "../config/config.js";


let productsDao;
let cartDao;
let usersDao;

console.log('esto es switch', config.DB_CLIENT)
switch(config.DB_CLIENT){
    case 'filedb':
        productsDao = ProductsDaoFile.getInstance();
        cartDao = CartDaoFile.getInstance();
        usersDao = UsersDaoFile.getInstance();
        break;
    default:
        productsDao = ProductsDaoMongoDB.getInstance('producto',ProductoSchema);
        cartDao = CartDaoMongoDB.getInstance('carrito',CarritoSchema);
        usersDao = UsersDaoMongoDB.getInstance('user',UserSchema);
}

export{
    productsDao,
    cartDao,
    usersDao
}
