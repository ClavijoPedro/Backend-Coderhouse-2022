# Entrega Nº2 Proyecto eCommerce

## Consigna
Desarrollar dos contenedores que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

Aspectos a incluir:

1.  A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
    
2.  En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor.
    
3.  Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

## Funcionalidad 
 El testeo de la misma se realizó mediante **Postman**. Se utilizaron los servicios de Firebase y MongoDB  para persistencia en la nube y File System para el alojamiento local.
 
El medio de persistencia puede ser modificado definiendo el valor de la variable de entorno DB como:

 -   firebase
 -   mongoDB
 -   fileSystem


#### Estructura Producto:
Para realizar las pruebas se paso el siguiente esquema de objeto en Postman:

			{
				"name": String,
				"price": Number,
				"description": String,
				"stock": Number,
				"image": String
			}

