//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

//=============================================
//2. INICIALIZACIÓN Y MIDDLEWARES
//=============================================
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const PORTADA_GENERICA = '/img/sin-portada.svg';

// Auxiliar para buscar portadas en TMDb
async function obtenerPortada(titulo) {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) return PORTADA_GENERICA;

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}&language=es-ES`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) return PORTADA_GENERICA;

        const datos = await respuesta.json();
        if (!datos.results || datos.results.length === 0) return PORTADA_GENERICA;

        const pelicula = datos.results[0];
        return pelicula.poster_path ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : PORTADA_GENERICA;
    } catch (error) {
        return PORTADA_GENERICA;
    }
}

//===============================================
//3. BASE DE DATOS EN ARCHIVO (.json)
//===============================================
const RUTA_ARCHIVO = path.join(__dirname, 'peliculas.json');

async function leerPeliculas() {
    try {
        const data = await fs.readFile(RUTA_ARCHIVO, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            const iniciales = [];
            await guardarPeliculas(iniciales);
            return iniciales;
        }
        return [];
    }
}

async function guardarPeliculas(peliculas) {
    try {
        await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(peliculas, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error al guardar en el archivo de películas:", error);
    }
}

//================================================
//4. RUTAS DE LA API (CRUD COMPLETO)
//================================================

// 1. GET (Leer todas las películas para tu vista actual)
app.get("/api/peliculas", async (req, res) => {
    const peliculas = await leerPeliculas();
    res.json(peliculas);
});

// 2. GET BÚSQUEDA (Ruta extra del Reto 2 para auto-completar/desplegable)
app.get("/api/peliculas/buscar", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Escribe algo para buscar" });

    const apiKey = process.env.TMDB_API_KEY;
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-ES`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const resultados = (datos.results || []).map(p => ({
            tmdbId: p.id,
            titulo: p.title,
            anio: p.release_date ? p.release_date.split('-')[0] : 'N/A',
            portada: p.poster_path ? `https://image.tmdb.org/t/p/w500${p.poster_path}` : PORTADA_GENERICA
        }));

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: "Error en la búsqueda externa" });
    }
});

// 3. POST (Añadir película evitando duplicados)
// Función auxiliar para normalizar texto (quita acentos, espacios extra y mayúsculas)
function limpiarTexto(texto) {
    if (!texto) return "";
    return texto
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Quita tildes (ej: "Mátrix" -> "matrix")
}

// 3. POST (Con filtro anti-duplicados a prueba de bombas)
app.post("/api/peliculas", async (req, res) => {
    const { titulo, director, anio, tmdbId, portada } = req.body;

    if (!titulo) {
        return res.status(400).json({ error: "El título es obligatorio" });
    }

    const peliculas = await leerPeliculas();
    const tituloLimpioNuevo = limpiarTexto(titulo);

    // 🛡️ COMPROBACIÓN ANTI-DUPLICADOS REFORZADA
    const yaExiste = peliculas.some(p => {
        // 1. Si ambas tienen ID de TMDb, comparamos IDs
        if (tmdbId && p.tmdbId && Number(p.tmdbId) === Number(tmdbId)) {
            return true;
        }
        // 2. Comparamos títulos sin tildes ni mayúsculas
        const tituloLimpioExistente = limpiarTexto(p.titulo);
        return tituloLimpioExistente === tituloLimpioNuevo;
    });

    if (yaExiste) {
        console.warn(`[Bloqueado] Intento de duplicado para: "${titulo}"`);
        return res.status(400).json({ error: "Esta película ya está en tu catálogo" });
    }

    // Obtener portada si no viene
    let portadaFinal = portada;
    if (!portadaFinal) {
        portadaFinal = await obtenerPortada(titulo);
    }

    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        tmdbId: tmdbId ? Number(tmdbId) : null,
        titulo: titulo.trim(),
        director: director ? director.trim() : "Desconocido",
        anio: anio || "Sin año",
        portada: portadaFinal
    };

    peliculas.push(nuevaPelicula);
    await guardarPeliculas(peliculas);

    console.log(`[Éxito] Película guardada: "${nuevaPelicula.titulo}"`);
    res.status(201).json(nuevaPelicula);
});

// 4. PUT (Editar película existente)
app.put("/api/peliculas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, director, anio } = req.body;

    const peliculas = await leerPeliculas();
    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    if (titulo && pelicula.titulo !== titulo) {
        pelicula.titulo = titulo;
        pelicula.portada = await obtenerPortada(titulo);
    }

    if (director) pelicula.director = director;
    if (anio) pelicula.anio = anio;

    await guardarPeliculas(peliculas);

    res.json(pelicula);
});

// 5. DELETE (Eliminar película)
app.delete("/api/peliculas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const peliculas = await leerPeliculas();
    const index = peliculas.findIndex(p => p.id === id);

    if (index !== -1) {
        peliculas.splice(index, 1);
        await guardarPeliculas(peliculas);
        res.json({ mensaje: "Película eliminada del catálogo" });
    } else {
        res.status(404).json({ error: "Película no encontrada" });
    }
});

//===============================================
//5. ARRANQUE DEL SERVIDOR
//===============================================
app.listen(3000, () => {
    console.log("🎬 Servidor listo en http://localhost:3000");
});
