// =========================================
// PRACTICA 1:
// AGREGAR USUARIO A LA TABLA
// =========================================


// Seleccionamos el formulario
const form = document.querySelector('#suscipcioForm');


// Seleccionamos los inputs
const inputNombre = document.querySelector('#nombreInput');

const inputEmail = document.querySelector('#emailInput');

const inputRol = document.querySelector('#rolInput');


// Seleccionamos la caja del mensaje
const cajaMensaje = document.querySelector('#mensajeExito');


// Seleccionamos el tbody de la tabla
const tablaBody = document.querySelector('#tablaUsuarios tbody');




// =========================================
// EVENTO SUBMIT
// =========================================

form.addEventListener('submit', (evento) => {

    // Evita que la página se recargue
    evento.preventDefault();



    // =========================================
    // CAPTURAMOS LOS DATOS
    // =========================================

    const nombre = inputNombre.value.trim();

    const email = inputEmail.value.trim();

    const rol = inputRol.value;



    // =========================================
    // VALIDACIÓN SIMPLE
    // =========================================

    if(nombre === '' || email === '' || rol === ''){

        alert('Por favor completa todos los campos');

        return;
    }



    // =========================================
    // CREAR NUEVA FILA
    // =========================================

    const nuevaFila = document.createElement('tr');



    // =========================================
    // INSERTAR DATOS EN LA FILA
    // =========================================

    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${email}</td>
        <td>${rol}</td>
    `;



    // =========================================
    // AGREGAR FILA A LA TABLA
    // =========================================

    tablaBody.appendChild(nuevaFila);



    // =========================================
    // MOSTRAR MENSAJE DE ÉXITO
    // =========================================

    cajaMensaje.textContent =
        `✅ Usuario "${nombre}" agregado correctamente.`;


    // Mostrar mensaje
    cajaMensaje.classList.remove('oculto');



    // =========================================
    // LIMPIAR FORMULARIO
    // =========================================

    form.reset();

});





// =========================================
// PRACTICA 2:
// BUSCADOR EN TIEMPO REAL
// =========================================


// Seleccionamos el buscador
const buscador = document.querySelector('#buscadorUsuarios');



// Evento input:
// Se ejecuta cada vez que escribimos
buscador.addEventListener('input', () => {

    // Convertimos el texto a minúsculas
    const terminoBusqueda =
        buscador.value.toLowerCase();



    // Seleccionamos TODAS las filas
    const filas =
        document.querySelectorAll('#tablaUsuarios tbody tr');



    // Recorremos cada fila
    filas.forEach(fila => {

        // Obtenemos el texto de la fila
        const textoFila =
            fila.textContent.toLowerCase();



        // ¿La fila incluye el texto buscado?
        if(textoFila.includes(terminoBusqueda)){

            // Mostrar fila
            fila.style.display = '';

        }else{

            // Ocultar fila
            fila.style.display = 'none';
        }

    });

});
