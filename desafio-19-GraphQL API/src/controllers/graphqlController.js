import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/graphqlProductsApi.js";

const schema = buildSchema(`
    input ProductInput{
        name: String,
        price: Int,
        description: String,
        stock: Int,
        image: String
    }
    type Product {
        id: ID!
        name: String,
        price: Int,
        description: String,
        stock: Int,
        image: String,
        code: Float
    }
    type Query {
        getProducts(id: String): [Product],
    }
    type Mutation {
        createProduct(data: ProductInput): Product
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`);


// class graphqlController{
//     constructor(){
//         return graphqlHTTP({
//             schema: schema,
//             rootValue: {
//             getProducts,
//             createProduct,
//             updateProduct,
//             deleteProduct
//             },
//             graphiql: true,
//             });
//     }
// }
const graphqlController = () => graphqlHTTP({
    schema: schema,
    rootValue: {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
    },
    graphiql: true,
    });

export default graphqlController;