function calcularIMC(){
    /*Obtener datos*/
       let peso = Number(document.getElementById('input-peso').value);
       let altura = Number(document.getElementById('input-altura').value);
       let etiqueta = document.getElementById('mensaje-salida');

       //formula del IMC : peso / altura(cuadrado)
       // let imc = peso / (altura**2);
       let imc = peso / (altura*altura);

       //multiples decisiones
        if(imc < 18.5) {
            etiqueta.textContent = "tu IMC es " + imc.toFixed(1) + ".eres un esqueleto 🩻";
            etiqueta.style.color = "blue";
        }else if(imc >=18.5 && imc <= 24.9){
            etiqueta.textContent = "tu IMC es " + imc.toFixed(1) + ".estas en la linea 😁";
            
        }else{
            etiqueta.textContent = "tu IMC es " + imc.toFixed(1) + ".danger!! 🐷"
            etiqueta.style.color = "red";
        }
      

}
