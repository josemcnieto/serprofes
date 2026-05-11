function comprobarNumero() {
    // 1.atrapamos el numero usando let
    let numero = Number(document.getElementById('numero-input').value);
    let etiqueta = document.getElementById('mensaje-salida');


//2.Tomamos la decision con IF / ELSE
if (numero < 5 ) {
    //Si el resto de la division entre 2 es 0 .....
    etiqueta.textContent = "la nota" + numero + "es suspenso";
    etiqueta.style.color = "red";
} else{
    //Si no ....
    etiqueta.textContent = "la nota" +numero + "es aprobado";
    etiqueta.style.color = "green";

}
}