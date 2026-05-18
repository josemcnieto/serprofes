// ejercicio 1: contador de clics (Gestion de Datos)
//1.Identificamos las etiquetas exactas que vamos a manipular
const btnContar = document.querySelector('#countBtn');
const spanCount = document.querySelector('#count');

//2. variable global para recordar el numero de clicks
let contador = 0;

//3. escuchamos el evento clic en el boton
btnContar.addEventListener('click', () => {
    contador++;  // Incrementa en 1 el valor matematico
    spanCount.textContent = contador; //Inyectamos el numero en el HTML
});

//ejercicio 2: Toggle menu (manipulacion de clases CSS)
const btnToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#mainNav');

btnToggle.addEventListener('click', () => {
    //classlist.toggle() es magico : si la clase 'oculto' esta, la quita .Si no esta la pone
    nav.classList.toggle('oculto');
    //cambiamos el texto del boton dependiendo de si el menu esta visible o no
    const estaOculto = nav.classList.contains('oculto');
    if(estaOculto) {
        btnToggle.textContent = 'Mostrar Menu';      
    }else{
        btnToggle.textContent = 'Ocultar Menu';
    }
});