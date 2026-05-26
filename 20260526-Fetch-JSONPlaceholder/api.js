import { baseURL } from "./config";

/**callAPI : nuestro cartero virtual(Cliente generico) 
* @param{String} ruta - La ruta final (ej. "/post/1")
* @param {Object} opciones- Configuracion extra (postMessage, delete...)
*/ 
export async function callAPI(ruta, opciones = {}){
    //1.Contruimos la URL completa (Base + Ruta)
    const urlCompleta = `${baseURL}${ruta}`;
    
    //2. Iniciamos el bloque de seguridad(intenta hacer esto si fallas
    //cae el CATCH)

    try {
        //3. El 'await' pausa la ejdcucion hasta que el servidor conteste
        const respuesta = await fetch(urlCompleta, {
            headers: {"Content-Type" : "application/json"},
            ...opciones // Pegamos cualquier opcion extra que nos pasen
        });
        
        // 4. Verificamos el estado (El servidor respondio,
        //pero igual dijo "404 No encontrado")
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }
        //5. Traducimos el paquete (JSON) a un objeto de que JavaScript entienda
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        // 6. Si se cae el internet o la URL no existe, lo atrapamos aqui
        console.error("Fallo critico en el cartero: ", error)
        throw error; // Lanzamos el error hacia arriba para que la pantalla lo muestre
    }
    )
}