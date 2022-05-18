import {faker} from '@faker-js/faker';


let id = 1;

const fakeProduct = () => {
    return{
        id:id++,
        name:faker.commerce.product(),
        price:faker.commerce.price(),
        image:faker.image.food()
    }
};

const createData = (qty) => {
    const products = [];
    for(let i = 0; i < qty; i++){
        products.push(fakeProduct())
    }
    return products;  
};


export {fakeProduct, createData}