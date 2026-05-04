console.log("! El cerebro de la web esta funcionando !");
//Funcion saludar
function saludar(){
    let nombre = prompt("¿Como te llamas?");
    alert("!Hola " + nombre +"! Ya eres programador/a.");
}
// Funcion verificar acceso
function verificarAcceso() {
    let edad = prompt("Introduce tu edad :");

    if (edad >=18) {
        alert("!Acceso permitido");
        console.log("Estado mayor de edad");
    }
        else{
            alert("!Acceso denegado! Eres menor.");
            console.log("Estado: Menor de edad detectado");
        }
    }

