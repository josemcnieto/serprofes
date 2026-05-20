//practica 1: formulario sin recarga

const form = document.querySelector('#suscipcioForm');
const inputNombre = document.querySelector('#nombreInput');
const cajaMensaje = document.querySelector('#mensajeExito');


//Escuchamos el evento 'submit'(cuando se envia el formulario)
form.addEventListener('submit', (evento) => {
    //1. la linea magica : evita que la pagina se recargue
    evento.preventDefault();
    //2. capturamos lo que el usuario escribio (.trim() quita el espacio)
    const textoEscrito = inputNombre.value.trim();
    //3.mostramos el mensaje de exito
    cajaMensaje.textContent = `✅ Usuario "${textoEscrito}" registrado correctamente en la base de datos.`;
    cajaMensaje.classList.remove('oculto');
});

//practica 2: buscador en tabla en tiempo real

const buscador = document.querySelector('#buscadorUsuarios');
//seleccionamos TODAS las filas que estan dentro del cuerpo de la tabla(tbody)
const filas = document.querySelectorAll('#tablaUsuarios tbody tr');

//el evento 'input' se dispara CADA VEZ que el usuario pulsa una tecla
buscador.addEventListener('input', () => {
    //1. convertimos lo que escribe el usuario a minuscula para evitar problemas de mayusculas
    const terminoBusqueda = buscador.value.toLowerCase();
    //2. Usamos el bucle forEach para revisar fila a fila
    filas.forEach(fila => {
        //obtenemos todo el texto d esa fila en minusculas
        const textoFila = fila.textContent.toLowerCase();
        //3. condicional ¿el texto de la fila INCLUYE  lo que buscamos?
        if(textoFila.includes(terminoBusqueda)){
            fila.style.display = '';
        }else{
            //si no lo incluye lo ocultamos
            fila.style.display = 'none';
        }
    });
});