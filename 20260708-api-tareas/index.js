//PRIMER SERVIDOR WEB CON EXPRESS
//1. Importamos la librería Express.
//Express nos permite crear servidores web de forma sencilla
const express = require("express");
//2. Creamos una aplicación con Express.
//La variable "app" será nuestro servidor
const app = express();
//3. Definmos el puerto donde escuchará el servidor
// En esta caso utilizaremos el puerto 3000
const PORT = 3000;
//4. Iniciamos el servidor
//listen() hace que el servidor quede esperando peticiones
//de los clientes (por ejemplo, desde un navegador)



//=================
//middleware
//===================
//un middleware es una funcion que se ejecuta antes de
//llegar a las rutas
//express.json() convierte autmaticamente los datos
//enviados en formato JSON en un objeto Javascript
//gracias a esste middleware podremos acceder a :
//req.body
//cuando el cliente envie informacion mediante POST o PUT
app.use(express.json());

//===============
//Base de datos en memoria 
//============
//simulamos una base de datos utilizando un arreglo
//importante:
//los datos solo existen mientras el servidor esta 
//encendido
//si detenemos Node.js, toda esta informacion se pierde
let tareas = [
    //primera tarea
    {
        id: 1,
        titulo: "Aprender Express",
        completada:false
    },
    //segunda tares
    {
        id:2,
        titulo: "Estudiar Node.js",
        completada: true
    },
    //tercera tarea
    {
        id:3,
        titulo:"Practicar Thunder Client",
        completada:false
    }

];
//==================
//ruta principal
//================
app.get("/", (req,res)=> {
    res.send("🚀 Bienvenido a la API REST de Tareas");
})

//=================
//ruta principal 
//=====================


app.listen(PORT, () => {
    //5. Cuando el servidor se incicia correctamente,
    //mostramos un mensaje en la consola.

//=================
//get-obtener todas las tareas
//=====================
//ruta:
//get /api/taras
//devuelve todas la tareas almecenadas
app.get("/api/tareas", (req,res) =>{
    //codigo HTTP 200 =OK
    //json () convierte automanticamente el arreglo
    //en  formato json
    res.status (200).json(tareas);

});


    console.log(`🎉Servidor ejecutándose en http://localhost:${PORT}`);
});

