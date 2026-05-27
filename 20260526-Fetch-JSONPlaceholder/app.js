import { callAPI } from "./api.js";

//Atrapamos los elementos de la interfaz
const pantalla = document.getElementById('pantalladeResultados');
const btnBuscar = document.getElementById('btnBuscar');
const inputID = document.getElementById('inputID');
const btnError = document.getElementById('btnError');
const fromCrear = document.getElementById('formCrear');

//GET DINAMICO (Buscar Publicacion)
btnBuscar.addEventListener('click', async ()=> {
    const id = inputID.value.trim();
    //Seguridad: Que no nos envie campos vacios
    if(id === ""){
        pantalla.textContent = "⚠ por favor, escribe un numero de ID.";
        return;
    }
    pantalla.textContent = "⌛ Viajando a internet....";

    try {
        //Llamamos a nuestro cartero con la ruta dinamica
        const post = await callAPI(`/posts/${id}`);
        //pintamos el objeto pantalla de forma bonita
        //JSON.stringify(objeto, null,2);
        pantalla.textContent = JSON.stringify(post, null,2);
    }catch(error){
        pantalla.textContent = "❌ No se encontro la publicacion o hubo un error."
    }
});

// Control de accidentes (try .... catch)
btnError.addEventListener('click', async ()=>{
    pantalla.textContent = "⌛ Forzando un accidente...";

    try{
        //enviaamos al cartero a una ruta que no existe en el servidor
        const data = await callAPI("/ruta-inventada-que-no-existe");
        pantalla.textContent = JSON.stringify(data, null, 2);
    }catch (error){
        //la ruta da error 404 , el codigo salta directamente  aqui y no se rompoe la web
         pantalla.textContent = `🛡 ¡ El escudo Try/Catch funciono! \nDetalle:${error.message}`;
    
}
});

//crear datos (post)
//en las empresas, no solo leemos internet, tambien mandamos informacion(registros, compras...)

fromCrear.addEventListener('submit',async (evento) => {
    //1, Evitamos el parpadeo  de la web al enviar formulario
    evento.preventDefault();

    pantalla.textContent = "⌛ Empaquetando y enviando datos....";
    //2. construimos  el "paquete " con la informacion de los inputs
    const tituloNuevo = document.getElementById('inputTitulo').value;
    const cuerpoNuevo = document.getElementById('inputCuerpo').value;

    const paqueteDatos = {
        title: tituloNuevo,
        body: cuerpoNuevo,
        userID: 1  //ponemos un ID de usuario fijo simulando que estamos logueados
    };

    try{
        //3. llamamos al cartero , pero esta vez le pasamos "opciones" (metodo post y el body)
        const respuestaServidor = await callAPI("/posts" , {
            method: "POST", //metodo para crear
            body: JSON.stringify(paqueteDatos) //convertimos nuestro objeto JS a texto JSON                       
            });
            //4, el servidor nos respone con el objeto creado (incluyendo su nuevo ID)
            pantalla.textContent = ` ✔ ¡Creacion exitosa en el servidor!\n\n` +JSON.stringify(respuestaServidor,null,2)
            //limpiamos los inputs
            document.getElementById('inputTitulo').value = "";
            document.getElementById('inputCuerpo').value = "";
                           
            }catch (error) {
                pantalla.textContent = `❌ Fallo la creacion: ${error.message}`;
            }
        });
    

