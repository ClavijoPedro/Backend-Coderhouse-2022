# Servidor con balance de carga

## Consigna
Agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

-   Agregar en la vista info, el número de procesadores presentes en el servidor.
    
-   Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
    
-   Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
-   Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
    
-   Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

### Instructivo de ejecución y configuración
#### comandos utiles CLI

    - tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
    - taskkill /pid numpid /f -> mata un proceso por su número de PID
    - taskkill /im node.exe /f  -> mata todos los procesos 

##
#### Configuración parámetros CLI & Nginx    

Ejecución de  dos instancias del servidor una modo fork y otra cluster.
Parámetros:
	-p : puerto   --->   ej: -p 8081
	-m: modo     ---> 	 ej: -m cluster
##
### Ejecución
Node.js:

     - Modo individual: node server.js -p 8081
     - Modo Cluster: node server.js -p 8081 -m cluster

Nodemon:

    - Modo fork: nodemon server.js -p 8081
    - Modo cluster: nodemon server.js -p 8081 -m cluster

Forever:

    - Modo fork: forever start server.js
    - Modo cluster: forever start server.js -p 8081 -m cluster

PM2:

     - Modo fork: pm2 start server.js --name=fork --watch -- 8080
     - Modo cluster: pm2 start server.js --name=cluster --watch -i max -- 8081
##
Nginx config:

    upstream datos {
    	#servidor iniciado en modo individual con node
        server 127.0.0.1:8080;
    }
    
    upstream randoms {
        #servidor iniciado en modo cluster con node
        server 127.0.0.1:8081;
    }
    
    # upstream randoms {
        # #servidor modo cluster / balance de carga con nginx
        # server 127.0.0.1:8082;
        # server 127.0.0.1:8083;
        # server 127.0.0.1:8084;
        # server 127.0.0.1:8085;
    # }
    
    server {
        listen 80;
        server_name localhost;
                  
    location / {
        proxy_pass http://datos;
    }
      
    location /api/randoms {
        proxy_pass http://randoms;
    }
