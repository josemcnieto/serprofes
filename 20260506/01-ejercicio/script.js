function comprobarNumero() {
    // 1.atrapamos el numero usando let
    let numero = Number(document.getElementById('numero-input').value);
    let etiqueta = document.getElementById('mensaje-salida');


//2.Tomamos la decision con IF / ELSE
if (numero % 2 === 0) {
    //Si el resto de la division entre 2 es 0 .....
    etiqueta.textContent = "El numero" + numero + "es PAR";
    etiqueta.style.color = "green";
} else{
    //Si no ....
    etiqueta.textContent = "El numero" +numero + "es IMPAR";
    etiqueta.style.color = "red";

}
}