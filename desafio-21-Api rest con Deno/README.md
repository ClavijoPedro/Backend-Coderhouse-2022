# Servidor en Deno
## Consigna:
1. Crear un servidor que utilice el módulo http servest y genere la vista con React render.
2. Configurar denon para que, ante un cambio de código, el servidor de reinicie
automáticamente.
El servidor presentará en su ruta raíz un formulario de ingreso de un color, que será enviado al mismo por
método post. Dicho color (en inglés) será incorporado a un array de colores persistido en memoria.
Por debajo del formulario se deberán representar los colores recibidos en una lista desordenada (ul)
utilizando el mismo color para la letra en cada caso. El color de fondo del la vista será negro.