import { logger } from '../utils/logger.js';
import CarritoDaoMongoDB from '../daos/CarritoDaoMongoDB.js';
import ProductosDaoMongoDB from '../daos/ProductosDaoMongoDB.js';
import sendMail from '../utils/sendMail.js';
import sendTxtMessage from '../utils/sendTxtMessage.js';
import config from '../../config.js';


const carrito = CarritoDaoMongoDB;
const productos = ProductosDaoMongoDB;


//Crea un carrito y devuelve su id
const createCart = async (req, res) => {    
    try{
        const cartId = await carrito.save({productos:[]}); 
        res.status(200).send(cartId);                    
    }catch(err){ logger.error(err) };
};

//Envia orden de productosal admin
const orderCartProudcts = async (req,res) => {
    const { cart_id } = req.params;
    const {name, email, phone} = await req.user;

    try{
        const cart = await carrito.listById(cart_id);
        if(cart && req.user){
            const cartProducts = cart.productos;

            const mailOptions = {
                from: 'Servidor Node.js',
                to: 'clavijopedro.dev@gmail.com',
                subject: `Nuevo pedido ${name} ${email}`, 
                html: `
                    <h3>Nuevo pedido:</h3>
                    <br>
                    <ul>
                        ${cartProducts.map(p => `<li>Producto: ${p.name} - Código:${p.code}</li>`)}
                    </ul>
                `
            };
            const sendOrderToAdmin = await sendMail(mailOptions);

            // const whatspOptions = {
            //     body: `${name} (${email}) tu pedido fue recibido y esta siendo procesado`,
            //     from:config.TWILIO_WHTSP_TRIAL_NUMBER,
            //     to:config.TWILIO_TO_NUMBER
            // }

            // const sendOrderToClient = await sendTxtMessage(whatspOptions)
            res.send(cartProducts)
        }

    }catch(err){logger.error(err)}
}


//Vacía un carrito y lo elimina
const deleteCart = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        await carrito.deleteById(cart_id);
        res.status(200).send('Carrito eliminado');
    }catch(err){ logger.error(err) };         
};


//lista productos guardados en el carrito 
const getCartProducts = async (req, res) => {   
    const { cart_id } = req.params;
    try{
        const cart = await carrito.listById(cart_id);
        res.status(200).send(cart.productos);
    }catch(err){ logger.error(err) }; 
};


//incorpora productos al carrito por su id
const sendToCart = async (req, res) => {   
    const { cart_id, id } = req.params;         
    try{
        const cart = await carrito.listById(cart_id); 
        const product = await productos.listById(id);
        cart.productos.push(product);
        await carrito.updateById(cart_id,cart);
        res.status(201).send('Producto agregado'); 
    }catch(err){ logger.error(err) }; 
};


 //Elimina un producto del carrito por su id de carrito y de producto
const removeFromCart = async (req, res) => { 
    const {cart_id, id} = req.params
    try{
        const cart = await carrito.listById(cart_id);
        const products = cart.productos.filter(itm => itm.id != id);  
        cart.productos = products;
        await carrito.updateById(cart_id, cart);   
        res.status(200).send('Producto eliminado')    
    }catch(err){ logger.error(err) }  
};


export default{
    createCart,
    deleteCart,
    getCartProducts,
    orderCartProudcts,
    sendToCart,
    removeFromCart
    
}