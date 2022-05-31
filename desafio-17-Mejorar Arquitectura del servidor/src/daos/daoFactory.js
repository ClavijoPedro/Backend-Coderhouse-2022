import ProductsDaoMemDB from "./ProductsDaoMemDB.js";
import ProductsDaoMongoDB from "./ProductsDaoMongoDB.js";
import CartDaoMemDB from "./CartDaoMemDB.js";
import CartDaoMongoDB from "./CartDaoMongoDB.js";
import UsersDaoMemDB from "./UsersDaoMemDB.js";
import UsersDaoMongoDB from "./UsersDaoMongoDB.js";
import ProductoSchema from '../models/ProductoSchema.js';
import CarritoSchema from '../models/CarritoSchema.js';
import UserSchema from "../models/UserSchema.js";
import config from "../config/config.js";


let productsDao;
let cartDao;
let usersDao;


switch(config.client_db){
    case 'memdb':
        productsDao = ProductsDaoMemDB.getInstance();
        cartDao = CartDaoMemDB.getInstance();
        usersDao = UsersDaoMemDB.getInstance();
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
