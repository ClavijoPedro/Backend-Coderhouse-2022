import axios from "axios";

const baseURL = 'http://localhost:3000/api'

//*==================================[Testing endpoints]======================================*//


//LISTAR TODOS
const getProducts = async () => {
    try {
        const response = await axios.get(`${baseURL}/productos`)
        return response.data
        
    } catch (err) {
        return({error: err})
    }
};

//GUARDAR NUEVO PRODUCTO
const saveProduct = async () => {
    try {
        const product = {
            "name": "test-product",
            "description": "test-product",
            "price": 100000,
            "stock": 10,
            "image": "test-product-url"
        }
        const response = await axios.post(`${baseURL}/productos`, product)
        return response.data
        
    } catch (err) {
        return({error: err})
    }
};

//ACTUALIZAR PRODUCTO
const updateProduct = async (id) => {
    try {
        const update = {
            "name": "test-product-updated",
            "description": "test-product-updated",
            "price": 5000,
            "stock": 5,
            "image": "test-product-url-updated"
        }
        const response = await axios.put(`${baseURL}/productos/${id}`, update)
        return response.data
        
    } catch (err) {
        return({error:err})
    }
};

//ELIMINAR PRODUCTO
const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/productos/${id}`)
        return response.data
        
    } catch (err) {
        return({error:err})
    }
};


export default{
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
};
