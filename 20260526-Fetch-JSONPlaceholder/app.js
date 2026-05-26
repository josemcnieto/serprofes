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
    }catch(error){
        pantalla.textContent = "❌ No se encontro la publicacion o hubo un error."
    }
});
