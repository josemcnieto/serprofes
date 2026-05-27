const btn = document.getElementById("btn-nueva");
const container = document.getElementById("foto-container");

async function cargaFoto(){
    //mensaje mientras carga
    container.innerHTML = "⌛ Buscando perrito por internet...."
    try {
        //peticion a la API
        const respuesta = await fetch(
            "https://api.thedogapi.com/v1/images/search"
            //"https://dog.ceo/api/breeds/image/random/12"
           
        );
      
        //verificamos si hubo error
        if(!respuesta.ok){
            throw new Error ("Fallo en el servidor");
        }
        //convertimos la respuesta a JSON
        const datos = await respuesta.json();
        //la API devuelve un array
        const data = datos[0];
        //nombre de la raza
        const nombreRaza = 
            data.breeds?.[0]?.name ||
            "Raza desconocida (Mestizo)";
        //mostramos imagen + raza 
        container.innerHTML = `
            <img
                src="${data.url}"
                alt="Perro aleatorio"
                />
               <p>
               <strong>Raza:</strong>${nombreRaza}
               </p>

        `;
    }catch  (error){
        //si algo falla
        container.innerHTML = `
        <p style="color:red;">
        ❌ Error al cargar la imagen:
        ${error.message}</p>
        `;
    }

    }
    //evento del boton
    btn.addEventListener("click", cargaFoto);
    //cargar al iniciar
    cargaFoto();



