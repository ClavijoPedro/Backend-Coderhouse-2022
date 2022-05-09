# Loggers - GZIP - Performance

## Consigna

#### GZIP
Incorporar al servidor la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.
##
#### Loggers
Luego implementar loggueo que registre lo siguiente:
-   Ruta y método de todas las peticiones recibidas por el servidor (info)
-   Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
-   Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:
-   Loggear todos los niveles a consola (info, warning y error)
-   Registrar sólo los logs de warning a un archivo llamada warn.log
-   Enviar sólo los logs de error a un archivo llamada error.log
##
#### Análisis de performance
Trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivar el child_process de la ruta '/randoms'

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:

1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.

Utilizar como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

Luego utilizar Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)

2) El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.

3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.

Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).
##
### Instructivo de ejecución y configuración

#### Comandos utiles CLI

- tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos

- taskkill /pid numpid /f -> mata un proceso por su número de PID

- taskkill /im node.exe /f -> mata todos los procesos

##
#### Configuración parámetros CLI 


    -p = puerto ---> ej: -p 8081
    --clog ---> agrega console.log a ruta info ej: node server.js 8081 --clog
    -m = modo(cluster || fork) ---> ej: -m cluster

##

### Ejecución

**Node profiling**

    Test --->  node --prof server.js
    Process ---> node --prof-process 'nombre-del-log.log' > result_prof-info.txt
#### Con console.log() en ruta /info

    Test --->  node --prof server.js --clog
    Process ---> node --prof-process 'nombre-del-log.log' > result_prof-infolog.txt
##
**Test de carga con Artillery**

    artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_info-0x.txt
##
**Autocannon**

    npm test =  node src/utils/benchmark.js
##
**Profiling Node inspect**

    node --inspect server.js
   👉 Click derecho en browser ---> inspeccionar ---> Node DevTools ---> profiling ---> start 
##
**0x flamegraph**

    0x -o server.js
    artillery quick --count 50 -n 20 "http://localhost:8080/info"
