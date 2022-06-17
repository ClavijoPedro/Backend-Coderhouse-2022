import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphql } from 'graphql';

const app = express();


app.use(express.static('public'));


const schema = buildSchema();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
    },
    graphiql: true,
    }));



    const PORT = 8080
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto:${PORT}`);
    });