
//1.nuestra base de datos mock
//es un array de objetos[rol, texto]
let historialChat = [
    {rol: "ia", texto: "¡Hola! Soy IA Master. ¿En que te ayudo?"},
    {rol: "usuario", texto: "Quiero aprender JavaScript"},
    {rol: "ia", texto: "¡Excelente eleccion! Empezaremos por los Arrays."},

];
//2.La funcion pintura(visual)
//Esta funcion recibe una lista (nuestro array) y lo dibuja en la pantalla
function pintarChat(listaMensajes){
    //paso 1 = buscamos en el html la etiquet donde vamos a meter los mensajes
    let caja = document.getElementById('caja-mensajes');
    //paso 2 = borramos la pizarra.
    //si no hacemos esto, cada vez que enviemos un mensaje nuevo,
    //se volvera a pintar todo el historial antiguo
    caja.innerHTML = "";
    //paso 3 = el trabajador virtual (el bucle for)
    //mantenemos el bucle for que aprendimos ayer
    //le decimos que de tantas vueltas como mensajes haya en la lista
    //(listaMensajes.legth)
    for(let i = 0; 1 < listaMensajes.length;i++){
        //paso 4: el condicional ternario(es un "if" resumido en una linea)
        //le preguntamos: ¿el rol de este mensaje es "usuario"?
        //si es true (usuario) - usamos la clase verde ("msg-usuario")
        //si es false(:) - usamos la clase gris("msg-ia")
        let claseCSS = listaMensajes[i].rol === "usuario" ? "msg-usuario" : "msg-ia";
        //paso 5: inyectar el html (usando comillas invertidas ``)
        //las ocmillas invertidas nos permiten meter variables de JS dentro del html
        //usando el simbolo de dolar y las llaves ${....}
        //caja.innerHTML += significa "añade este bloque al final de lo que haya"
        caja.innerHTML += 
                            `<div class = "${claseCSS}">
                             <b>${listaMensajes[i].rol.toUpperCase()}:</b><br>
                             ${listaMensajes[i].texto}</div>
                            `;
    }
    //paso 6: el auto-scroll (el truco de whatsapp)
    //le decimos a la caja que baje su barra de desplazamiento hasta el fondo
    //para que siempre veamos el ultimo mensaje enviado
    caja.scrollTop = caja.scrollHeight;
}    
pintarChat(historialChat);        
        







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
