//Generar numero aleatorio
// Math.random() genera un numero entre 0 y 1
//al * 10 => 0 y 9
//+1 => 1 y 10
let numeroSecreto = Math.floor(Math.random()*10) + 1;
// variables del juego 
let vidas = 3;
// funcion principal
function comprobarNumero() {
    //captura el numero que escribe el usuario
    let intento = Number(
        document.getElementById("input-numero").value
    );
    //captura el parraf donde mostramos mensajes
    let etiqueta = document.getElementById('mensaje-salida');
    //captura el texto de vida
    let textoVidas = document.getElementById('texto-vidas');

    //si el usuario gana
    if(intento === numeroSecreto){
        etiqueta.textContent = 
            "¡HAS GANADO!  🎈El numero era " +numeroSecreto; 
            etiqueta.style.color = "green"
    } else {
        //restamos vidas
        vidas --;
        //actualizar el texto de vidas en la pantalla
        textoVidas.textContent = "Vidas: " + vidas + "🧡";
  }
  // ** pistas **
  if (intento < numeroSecreto) {
    etiqueta.textContent = 
    "¡Fallo! El numero es MAYOR ⬆"
  } else {
        etiqueta.textContent = 
        "¡FALLO! El numero es MENOR ⬇"

  }
  etiqueta.style.color = "orange";
  //game over
  if (vidas === 0) {
    etiqueta.textContent = 
    "💀 GAME OVER. El numero era " + numeroSecreto;
    etiqueta.style.color = "red";
    //desactivar el boton
    document.getElementById('btn-jugar').disable = true;
  }
}
