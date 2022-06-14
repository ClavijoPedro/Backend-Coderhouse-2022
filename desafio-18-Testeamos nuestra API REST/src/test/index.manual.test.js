import test from './test_client.js'
import { productsDao } from '../daos/daoFactory.js'
import logger from '../utils/logger.js'



//*==================================[Testing Client & Server response]======================================*//


const testGetProducts = async () => {
    try {
        const clientResponse = await test.getProducts()
        const serverResponse = await productsDao.listAll()
        const clientStatus = clientResponse.error ? clientResponse.error : clientResponse;
        console.log(`Client test Data:`, clientStatus)
        console.log(`Server test Data:`, serverResponse)
    } catch (error) {
        logger.error(`Test fallido - [Error] - ${error}`)
        
    }
};

const testSaveProducts = async () => {
    try {
        const clientResponse = await test.saveProduct()
        const clientStatus = clientResponse.error ? clientResponse.error : clientResponse;
        const serverItem = await productsDao.listById(clientResponse)
        const serverResponse = await productsDao.save(serverItem)
        console.log(`Client test response:`, clientStatus)
        console.log(`Server test response:`, serverResponse)
        return clientResponse
    } catch (error) {
        logger.error(`Test fallido - [Error] - ${error}`)
        
    }
};

const testUpdateProducts = async (id) => {
    try {
        const clientResponse = await test.updateProduct(id)
        const clientStatus = clientResponse.error ? clientResponse.error : clientResponse;
        const serverItemUpdate = await productsDao.listById(id)
        const serverResponse = await productsDao.updateById(id , serverItemUpdate)
        console.log(`Client test response:`, clientStatus)
        console.log(`Server test response:`, serverResponse)
    } catch (error) {
        logger.error(`Test fallido - [Error] - ${error}`)
        
    }
};

const testDeleteProducts = async (id) => {
    try {
        const clientResponse = await test.deleteProduct(id)
        const clientStatus = clientResponse.error ? clientResponse.error : clientResponse;
        const serverItemToDelete = await test.saveProduct();
        const serverResponse = await productsDao.deleteById(serverItemToDelete)
        console.log(`Client test response:`, clientStatus)
        console.log(`Server test response:`, serverResponse)
    } catch (error) {
        logger.error(`Test fallido - [Error] - ${error}`)
        
    }
};


async function maketest() {
    try {

        console.log(`
        ----------------------------------
         Testeando Metodo POST Productos
        ----------------------------------
        `)
        const id = await testSaveProducts();
        
        console.log(`
        ----------------------------------
         Testeando Metodo GET Productos
        ----------------------------------
        `)
        await testGetProducts()
        
        console.log(`
        ----------------------------------
         Testeando Metodo PUT Productos
        ----------------------------------
        `)
        await testUpdateProducts(id)
        
        console.log(`
        ----------------------------------
         Testeando Metodo DELETE Productos
        ----------------------------------
        `)
        await testDeleteProducts(id)
        
    } catch (err) {
        logger.error({test_status:'failed', error:err })
    }
};

maketest();