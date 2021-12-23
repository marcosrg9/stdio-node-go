# IPC entre NodeJS y Go (Stdio)
Este repositorio contiene un experimento para la comunicación entre procesos.

La idea básica consiste en un proceso padre que lance un proceso hijo para posteriormente autodestruír el padre y mantener al hijo como un proceso huérfano. Cuando el proceso hijo haya finalizado todas las tareas, deberá invocar al "padre" nuevamente.

## 🎯 Objetivo
Para un proyecto personal se require actualizar los binarios de una aplicación basada en electron de forma automática (y sin dependencias en este sentido). El usuario simplemente debe hacer clic en 'actualizar' y esperar a que todo haya finalizado.

El problema de este enfoque es que no se puede actualizar un binario (eliminar y copiar el nuevo) mientras está en ejecución. 

Por ello es necesario:
- <strong>1.</strong> Crear un proceso hijo.
- <strong>2.</strong> Realizar comprobaciones de disponibilidad del binario v2. (desde el hijo)
- <strong>3.</strong> Esperar a que el padre finalice su ejecución (autodestrucción).
- <strong>4.</strong> Comenzar a realizar tareas en el proceso hijo (eliminar binario v1 y copiar el v2).
- <strong>5.</strong> Una vez finalizadas las tareas, invocar al que era el proceso padre desde el hijo.
- <strong>6.</strong> Finalizar la ejecución del proceso hijo.

El flujo debe ser secuencial, mediante mensajes de control a través de stdio (se deben prevenir las condiciones de carrera).

La implementación original está escrita en TypeScript, pero para facilitar la comprensión, se ha vuelto a escribir en Js.

## ✅ Preparando el entorno

Para probar este ejemplo es necesario disponer de [Go](https://go.dev/) y [Node](https://nodejs.org/es/) en el sistema.

Con todo ello listo, clonar el repositorio:

    git clone https://github.com/marcosrg9/stdio-node-go.git

Acceder al directorio del repositorio, ejecutar ```npm run build``` y después ```npm start```.