# Entrega Nº1 Proyecto eCommerce


## Consigna

Estado de avance de una aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com.
En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ).

  

Aspectos a incluir:

El router base '/api/productos' implementará cuatro funcionalidades:

	GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id disponible para usuarios y administradores)
    
    POST: '/' - Para incorporar productos al listado (disponible para administradores)
    
    PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
    
    DELETE: '/:id' - Borra un producto por su id (disponible para administradores)



El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
    

	 POST: '/' - Crea un carrito y devuelve su id.
    
	 DELETE: '/:id' - Vacía un carrito y lo elimina.
    
	 GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    
	 POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    
	DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    

Crear una variable booleana administrador, cuyo valor será configurado más adelante con el sistema de login. Según su valor (true ó false) permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolvera un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

Los productos dispondrán de los siguientes campos:
	
	id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    
El carrito de compras tendrá la siguiente estructura:
    
	id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
    
Realizar la persistencia de productos y del carrito de compras en el filesystem.


Prueba de funcionalidad:

Se realizó en Postman. Se testeo cada uno de los endpoints (productos y carrito) y su operación en conjunto.



