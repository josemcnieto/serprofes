//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");
const fs = require("fs"); // El módulo para leer y escribir archivos
const path = require("path");

//=============================================
//2. INICIALIZACIÓN Y CONFIGURACIÓN
//=============================================
const app = express();
const PUERTO = 3000;
const rutaArchivo = path.join(__dirname, "rutas.json");

// Middlewares globales
app.use(cors());
app.use(express.json());

//================================================
//3. FUNCIONES AUXILIARES (AYUDANTES DEL ARCHIVO)
//================================================

// Función para LEER los datos del archivo JSON
const leerArchivo = () => {
    try {
        const datosRaw = fs.readFileSync(rutaArchivo, "utf-8");
        return JSON.parse(datosRaw); // Transforma el texto plano en un array de JavaScript
    } catch (error) {
        console.error("Error leyendo el archivo JSON:", error);
        return []; // Si hay error, devuelve un array vacío para no romper la app
    }
};

// Función para ESCRIBIR los datos en el archivo JSON
const guardarArchivo = (datosAnidados) => {
    try {
        // Transforma el array en texto plano con espacios (2) para que sea legible
        fs.writeFileSync(rutaArchivo, JSON.stringify(datosAnidados, null, 2), "utf-8");
    } catch (error) {
        console.error("Error guardando en el archivo JSON:", error);
    }
};

//================================================
//4. RUTAS DE LA API (CRUD REAL)
//================================================

// [GET] Leer todas las rutas de las catedrales
app.get("/api/rutas-goticas", (req, res) => {
    const rutasGoticas = leerArchivo(); // Leemos del JSON
    res.json(rutasGoticas);
});

// [POST] Añadir una nueva ruta al archivo
app.post("/api/rutas-goticas", (req, res) => {
    const rutasGoticas = leerArchivo(); // 1. Traemos el estado actual
    const { nombre, duracionDias, distanciaKm, catedrales } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre de la ruta es obligatorio." });
    }

    // 2. Creamos la nueva ruta calculando el ID dinámicamente
    const nuevaRuta = {
        id: rutasGoticas.length > 0 ? rutasGoticas[rutasGoticas.length - 1].id + 1 : 1,
        nombre,
        duracionDias: duracionDias || 1,
        distanciaKm: distanciaKm || 0,
        catedrales: catedrales || []
    };

    // 3. Añadimos la ruta al array local
    rutasGoticas.push(nuevaRuta);

    // 4. SOBREESCRIBIMOS el archivo JSON con el array actualizado
    guardarArchivo(rutasGoticas);

    res.status(201).json(nuevaRuta);
});

// [PUT] Modificar una ruta existente
app.put("/api/rutas-goticas/:id", (req, res) => {
    const rutasGoticas = leerArchivo();
    const id = parseInt(req.params.id);
    const { nombre, duracionDias, distanciaKm, catedrales } = req.body;

    const ruta = rutasGoticas.find(r => r.id === id);

    if (!ruta) {
        return res.status(404).json({ error: "La ruta del gótico solicitada no existe." });
    }

    if (nombre) ruta.nombre = nombre;
    if (duracionDias !== undefined) ruta.duracionDias = duracionDias;
    if (distanciaKm !== undefined) ruta.distanciaKm = distanciaKm;
    if (catedrales) ruta.catedrales = catedrales;

    guardarArchivo(rutasGoticas); // Guardamos los cambios en el JSON
    res.json(ruta);
});

// [DELETE] Eliminar una ruta
app.delete("/api/rutas-goticas/:id", (req, res) => {
    const rutasGoticas = leerArchivo();
    const id = parseInt(req.params.id);

    const indice = rutasGoticas.findIndex(r => r.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "La ruta del gótico que intentas eliminar no existe." });
    }

    rutasGoticas.splice(indice, 1);
    guardarArchivo(rutasGoticas); // Guardamos la lista sin el elemento eliminado

    res.json({ mensaje: "Ruta del gótico eliminada correctamente." });
});

//==========================================
//5. ENCENDIDO DEL SERVIDOR
//==========================================
app.listen(PUERTO, () => {
    console.log(`🏰 Backend del Gótico Activo en http://localhost:${PUERTO}`);
});
