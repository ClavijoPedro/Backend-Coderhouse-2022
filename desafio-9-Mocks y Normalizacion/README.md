# Mocks y Normalización
## Consigna

#### Parte 1:
Crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con
5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Conformar el objeto ‘producto’ (nombre, precio y foto).

#### Parte 2:
1. Para la persistencia de los mensajes crear un contenedor que permita guardar objetos anidados (mongodb en la nube).
2. El mensaje se envía del frontend hacia el backend, el cual lo almacenará en la base de datos. Luego cuando el cliente se conecte o envíe un mensaje, recibirá un array de mensajes a representar en su vista.
3. El array que se devuelve debe estar normalizado con normalizr, conteniendo una entidad de autores. 
4. El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.