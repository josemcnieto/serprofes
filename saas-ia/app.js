function enviarPrompt(event){
    //evitamos que el form recargue la pagina
    event.preventDefault();

    //1. capturar el texto

    let mensaje = document.getElementById('mensaje-input').value.trim();

    //2. condicional

    if (mensaje === ""){
        alert("⚠️¡Error! Escribe algo primero");
    } else{
        alert("🤖 mensaje recibido:\n" + mensaje);
        //3. limpiar input
        document.getElementById('mensaje-input').value="";
    }

}