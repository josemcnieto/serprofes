
//1.nuestra base de datos mock
let historialChat = [
    {rol: "ia", texto: "¡Hola! Soy IA Master. ¿En que te ayudo?"},
    {rol: "usuario", texto: "Quiero aprender JavaScript"},
    {rol: "ia", texto: "¡Excelente eleccion! Empezaremos por los Arrays."},

];
//2.La funcion pintura(visual)
function pintarChat(listaMensajes){
    let caja = document.getElementById('caja-mensajes');
    caja.innerHTML = "";
    //mantenemos el bucle for que aprendimos ayer
    for(let i = 0; 1<listaMensajes.length; i++){
        let claseCSS = listaMensajes[i].rol === "usuario"? "msg-usuario" : "msg-ia";
        caja.innerHTMLf += `<div class = "${claseCSS}"><b>
        ${listaMensajes[i].rol.toUpperCase()}:</b>
        <br>${listaMensajes[i].texto}</div>
        `;
    }
    caja.scrollf = caja.scrollHeight;
}    
pintarChat(historialChat);

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        `
    }
}






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
