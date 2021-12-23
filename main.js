const { spawn } = require('child_process');
const { platform } = require('os')

const execChild = () => {

    let path = `${__dirname}/child`;

    platform() === 'win32' ? path += '.exe' : null
    
    // Instancia al proceso hijo.
    const child = spawn(path);

    // Salida estándar
    child.stdout.on('data', chunk => {
        
        chunk = chunk.toString('utf-8');

        if (chunk === 'ready') {
            // El script está preparado para trabajar...

            // Escribe en la entrada estándar.
            child.stdin.write('0001');
            /* Cierra el flujo.
            ⚠️ Si no se hace, el binario de Go no continúa la ejecución. */
            child.stdin.end();
            
            // El proceso finaliza automáticamente.
            process.exit(0);

        } else {
            console.log(chunk);
        }
    })

    // Error estándar
    child.stderr.on('data', chunk => {

    })

    // Eventos de errores del hijo.
    child.on('error', (err) => {

        // Error de instanciación.
        if (err.code === 'ENOENT') {
            console.error(`Asegúrate de que el binario esté disponible en el directorio ${__dirname}.\nEjecuta npm run build y vuelve a intentarlo.`)
        }
    })

}

execChild();