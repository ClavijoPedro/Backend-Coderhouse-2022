# API GraphQL

  

## Consigna
En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.
- Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
- Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.



## Implementación GraphQL

Acciones CRUD sobre los productos en base de datos.

**Ejemplo Query**

    query{
        getProducts {
            id,
            name,
            description,
            price,
            image,
            stock,
            code,
        }
    }

**Ejemplos Mutation**

    mutation{
        createProduct(data:{
          name:"graphql-prod",
          description:"graphql-prod",
          price:0,
          image:"graphql-prod-img",
          stock:0,
        }) {
          id, name
        }
    }

    mutation{
        updateProduct(id:"9" ,data:{
          name:"graphql-prod-updated2",
          description:"graphql-prod-updated",
          price:1,
          image:"graphql-prod-img-updated",
          stock:1,
        }) {
          id
        }
    }

    mutation{
        deleteProduct(id:"9") {
          id,
        }
    }

    

