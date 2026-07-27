const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
const ARCHIVO_DATOS = "./edificios.json";

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// FUNCIÓN AUXILIAR DE LECTURA SEGURA
// Garantiza que siempre devuelva un array válido,
// incluso si el archivo no existe o se corrompió.
// ==========================================
function obtenerEdificios() {
    try {
        if (!fs.existsSync(ARCHIVO_DATOS)) {
            fs.writeFileSync(ARCHIVO_DATOS, "[]", "utf-8");
            return [];
        }
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
        if (!data.trim()) {
            fs.writeFileSync(ARCHIVO_DATOS, "[]", "utf-8");
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("⚠️ Error leyendo el archivo JSON, reiniciando datos:", error.message);
        fs.writeFileSync(ARCHIVO_DATOS, "[]", "utf-8");
        return [];
    }
}

// ==========================================
// RUTAS DE LA API
// ==========================================

// 1. LECTURA (GET)
app.get("/api/edificios", (req, res) => {
    try {
        const edificios = obtenerEdificios();
        res.status(200).json(edificios);
    } catch (error) {
        console.error("Error en GET /api/edificios:", error);
        res.status(500).json({ error: "Error interno del servidor al leer los edificios." });
    }
});

// 2. CREACIÓN (POST)
app.post("/api/edificios", (req, res) => {
    const { nombre, arquitecto, ciudad, anio } = req.body;

    if (!nombre || !arquitecto || !ciudad || !anio) {
        return res.status(400).json({ error: "Faltan datos obligatorios (nombre, arquitecto, ciudad o año)." });
    }

    try {
        const edificios = obtenerEdificios();
        const nuevoId = edificios.length > 0 ? edificios[edificios.length - 1].id + 1 : 1;

        const nuevoEdificio = {
            id: nuevoId,
            nombre: nombre.trim(),
            arquitecto: arquitecto.trim(),
            ciudad: ciudad.trim(),
            anio: parseInt(anio)
        };

        edificios.push(nuevoEdificio);
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(edificios, null, 2), "utf-8");

        res.status(201).json(nuevoEdificio);
    } catch (error) {
        console.error("Error en POST /api/edificios:", error);
        res.status(500).json({ error: "Error interno del servidor al guardar el edificio." });
    }
});

// 3. ACTUALIZACIÓN (PUT)
app.put("/api/edificios/:id", (req, res) => {
    const idParametro = parseInt(req.params.id);
    const { nombre, arquitecto, ciudad, anio } = req.body;

    try {
        let edificios = obtenerEdificios();
        const index = edificios.findIndex(edificio => edificio.id === idParametro);

        if (index === -1) {
            return res.status(404).json({ error: "Edificio no encontrado en la base de datos." });
        }

        if (nombre) edificios[index].nombre = nombre.trim();
        if (arquitecto) edificios[index].arquitecto = arquitecto.trim();
        if (ciudad) edificios[index].ciudad = ciudad.trim();
        if (anio) edificios[index].anio = parseInt(anio);

        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(edificios, null, 2), "utf-8");

        res.status(200).json(edificios[index]);
    } catch (error) {
        console.error("Error en PUT /api/edificios/:id:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar el edificio." });
    }
});

// 4. ELIMINACIÓN (DELETE)
app.delete("/api/edificios/:id", (req, res) => {
    const idParametro = parseInt(req.params.id);

    try {
        let edificios = obtenerEdificios();
        const existe = edificios.some(edificio => edificio.id === idParametro);

        if (!existe) {
            return res.status(404).json({ error: "Edificio no encontrado." });
        }

        const edificiosRestantes = edificios.filter(edificio => edificio.id !== idParametro);
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(edificiosRestantes, null, 2), "utf-8");

        res.status(200).json({ mensaje: "Edificio eliminado correctamente." });
    } catch (error) {
        console.error("Error en DELETE /api/edificios/:id:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar el edificio." });
    }
});

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor operativo en http://localhost:${PORT}`);
    console.log(`📂 Persistencia en: ${ARCHIVO_DATOS}`);
});
