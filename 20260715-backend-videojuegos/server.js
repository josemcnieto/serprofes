//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");

//=============================================
//2. INICIALIZACIÓN
//=============================================
const app = express();

//=============================================
//3. MIDDLEWARES (CONFIGURACIÓN GLOBAL)
//=============================================
app.use(cors());
app.use(express.json());

//===============================================
//4. NUESTRA BASE DE DATOS
//===============================================
let videojuegos = [
    { id: 1, titulo: "Need for Speed" },
    { id: 2, titulo: "Minecraft" },
    { id: 3, titulo: "Roblox" }
];

//================================================
//5. RUTAS DE LA API (CRUD)
//================================================

// Leer el catálogo completo (GET)
app.get("/api/videojuegos", (req, res) => {
    res.json(videojuegos);
});

// Añadir un videojuego nuevo (POST)
app.post("/api/videojuegos", (req, res) => {
    const { titulo } = req.body;

    // Validación básica
    if (!titulo) {
        return res.status(400).json({
            error: "Faltan datos obligatorios"
        });
    }

    const nuevoVideojuego = {
        id: videojuegos.length > 0
            ? videojuegos[videojuegos.length - 1].id + 1
            : 1,
        titulo
    };

    videojuegos.push(nuevoVideojuego);

    res.status(201).json(nuevoVideojuego);
});

// Modificar un videojuego (PUT)
app.put("/api/videojuegos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo } = req.body;

    const videojuego = videojuegos.find(v => v.id === id);

    if (!videojuego) {
        return res.status(404).json({
            error: "Videojuego no encontrado"
        });
    }

    if (titulo) {
        videojuego.titulo = titulo;
    }

    res.json(videojuego);
});

// Eliminar un videojuego (DELETE)
app.delete("/api/videojuegos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const indice = videojuegos.findIndex(v => v.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: "Videojuego no encontrado"
        });
    }

    videojuegos.splice(indice, 1);

    res.json({
        mensaje: "Videojuego eliminado correctamente"
    });
});

//==========================================
//6. ENCENDIDO DEL SERVIDOR
//==========================================
const PUERTO = 3000;

app.listen(PUERTO, () => {
    console.log(`🎮 Servidor de videojuegos listo en el puerto ${PUERTO} (CORS Activado)`);
});