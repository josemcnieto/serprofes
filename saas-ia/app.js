
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
    for(let i = 0; i < listaMensajes.length;i++){
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
    //atrapamos la cajita de texto donde el usuario escribe
    let input = document.getElementById('mensaje-input');

    //1. capturar el texto
    //sacamos el texto que ha esacrito el y le quitamos los espacio en blanoc
    //con .trim()
    let mensaje = input.value.trim();

    //2. condicional

    if (mensaje === ""){
        alert("⚠️¡Error! Escribe algo primero");
        //el return expulsa a JS de la funcion para que no siga leyendo
        return;
    }
    //guardamos el mensaje real del usuario
    let nuevoMensaje = {rol:"usuario", texto:mensaje};
    historialChat.push(nuevoMensaje);  //lo metemos al final del Array
   //b) el truco: simulamos que la IA nos responde al instante creando otro objeto
   let respuestaIA = {rol: "ia", texto: "Estoy procesando tu mensaje: '" + mensaje + "'"};
   historialChat.push(respuestaIA);

   // c) como el array ha cambiado (tiene dos mensajes mas), obligamos a la web repintarse
   pintarChat(historialChat);
   //d ) limpiamos el texto que quedo escrito en el inmput
   input.value = "";
   input.focus();
}

//mini reto :  ver todo
function mostrarTodo(){
    pintarChat(historialChat);  
}
//mini reto 2-boton filtrar, el portero (Filter)
function verMisMensajes() {
    //revisa todo el historial . A cada mensaje lo llama "msj"
    //devuelve una lista nueva SOLO ocn los dque cumplan la regla
    // (rol === "usuario")
    let soloUsuario = historialChat.filter(msj => msj.rol === "usuario");
    //le pasamos esa lista cortita a nuestra funcion pintora
    pintarChat(soloUsuario);
 
}

function modoGritar(){

    //entra a todo el historial . Por cada mensaje ("msj") , construye un objeto nuevo
    let chatGritando = historialChat.map(msj => {
        return{
            rol: msj.rol,
            //aqui esta la transformacion: convertimos el texto original a mayusculas
            texto: msj.texto.toUpperCase()
        };
    });
    //le pasamos esa lista transformada a nuestra funcion pintora
    pintarChat(chatGritando);
}

/////////////////
// function borrarChat(){

//      historialChat.length = 0;
// };
// 


//reto 1. boton borrar
function borrarChat(){
    //1. Vaciamos la memoria (array vacio)
    historialChat = [];
    //2.pintamos en el html
    pintarChat(historialChat);
}
//reto 2. buscador inteligente(filter+includes)
function buscarMensaje(){
    //1. atrapamos lo que el usuario ha escrito en la cajita del buscador
    //usamos .toLowerCase() para pasarlo a minusculas y evitar problemas
    //  de mayusculas/minuscular
    let palabraBuscada = document.getElementById('input-buscador').value.toLowerCase();
    //2. usamos el portero (filter)  para revisar el historial
    let resultados = historialChat.filter(msj => {
        //pasamos el texto original del mensaje a minusculas y le preguntaremos:
        //"¿Este texto .include() (incluye) la palabra buscadas?"
        return msj.texto.toLowerCase().includes(palabraBuscada);
    });
    //3.pintamos la pantalla solo los resultados encontrados
    pintarChat(resultados);
}