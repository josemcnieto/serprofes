//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");// Importamos nuestro guardián de seguridad

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
//REGLA DE ORO: ¡CORS SIEMPRE ANTES DE LAS RUTAS!
app.use(cors());// Da permiso a React para entrar sin que el navegador lo bloquee
app.use(express.json());// Traduce el texto entrante a formato JSON

//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let peliculas = [
    {id:1, titulo: "Need for spead"},
    {id:2, titulo: "Minecraft"},
    {id:3, titulo: "Roblox"}
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================
// Leer el catálogo completo (GET)
app.get("/api/videojuegos", (req,res)=>{
    res.json(videojuegos);
});


//Añadir un videojuego nuevo (POST)
app.post("/api/videojuegos", (req, res) => {
    const { titulo } = req.body;
    //Validación básica para evitar guardar datos vacíos
    if(!titulo ) {
        return res.status(400).json({ error: "Faltan datos obligatorios"});
    }

    const nuevoVideojuego = {
        id: videojuegos.length > 0 ? videojuego[videojuegos.length - 1].id + 1 : 1,
        titulo: titulo
        
    };

    videojuegos.push(nuevoVideojuego);
    res.status(201).json(nuevoVideojuego);
})


//==========================================
//6. ENCENDIDO DEL SERVIDOR
//==========================================
app.listen(3000, () => {
    console.log("🎬 Servidor de películas listo en el puerto 3000 (CORS Activado)");
});
