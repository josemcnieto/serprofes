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
//ejercicio 3 : modo oscuro
const toggleOscuro = document.querySelector('#themeToggle');
const textoSwitch = document.querySelector('.switch-text');
const cuerpoWeb = document.body;
//paso A : comprobar si el ususario ya tenia el modo oscuro
//guardado al cargar la pagina
const temaGuardado = localStorage.getItem('temaPreferido');
if(temaGuardado === 'oscuro'){
    cuerpoWeb.classList.add('dark');
    toggleOscuro.checked = true;
    textoSwitch.textContent = 'Desactivar Modo Oscuro';
}
//paso B: escuchar cuando el usuario marca o desmarca el checkbox
toggleOscuro.addEventListener('change', () =>{
    if (toggleOscuro.checked){
     cuerpoWeb.classList.add('dark');
     localStorage.setItem('temaPreferido' ,'oscuro');
     textoSwitch.textContent = 'Desactivar Modo Oscuro';
}else{
    //si se desmarca, quitamos la clase y guardamos la preferencia clara
    cuerpoWeb.classList.remove('dark');
    localStorage.setItem('temaPreferido' , 'claro');
    textoSwitch.textContent = 'Activar Modo Oscuro';
}
});

// 🔥 RETO BONUS: Botón de pago seguro
const btnPago = document.querySelector('#payBtn');
const estadoPago = document.querySelector('#estadoPago');

btnPago.addEventListener('click', () => {

    // Cambiar texto + icono
    btnPago.innerHTML = '⏳ Procesando pago...';

    // Deshabilitar botón
    btnPago.disabled = true;

    // Agregar clase visual
    btnPago.classList.add('loading');

    // Mostrar mensaje bonito
    estadoPago.innerHTML = '✅ Pago procesándose correctamente';
});