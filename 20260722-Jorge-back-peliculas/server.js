//==================================
//1. IMPORTACIONES
//==================================
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();

//=============================================
//2. INICIALIZACIÓN Y CONFIGURACIÓN
//=============================================
const app = express();
const RUTA_JSON = path.join(__dirname, "peliculas.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PORTADA_GENERICA = "/img/sin-portada.svg";

// Helper para normalizar textos (elimina espacios extra, mayúsculas y acentos)
function normalizarTexto(texto) {
  if (!texto) return "";
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Quita tildes
}

// ---------------- Helper: Manejo de File System (RETO 1) ----------------
async function leerPeliculas() {
  try {
    const data = await fs.readFile(RUTA_JSON, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function guardarPeliculas(peliculas) {
  await fs.writeFile(RUTA_JSON, JSON.stringify(peliculas, null, 2), "utf-8");
}

// ---------------- Helper: Conexión con TMDb ----------------
async function obtenerPortada(titulo) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return PORTADA_GENERICA;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) return PORTADA_GENERICA;

    const datos = await respuesta.json();
    if (!datos.results || datos.results.length === 0) return PORTADA_GENERICA;

    const pelicula = datos.results[0];
    return pelicula.poster_path
      ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
      : PORTADA_GENERICA;
  } catch (error) {
    return PORTADA_GENERICA;
  }
}

//================================================
//3. RUTAS DE LA API (CRUD)
//================================================

// Endpoint de Búsqueda
app.get("/api/peliculas/buscar", async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.TMDB_API_KEY;

  if (!query || !apiKey) return res.json([]);

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (!datos.results) return res.json([]);

    const resultados = datos.results.slice(0, 5).map((p) => ({
      tmdbId: p.id,
      titulo: p.title,
      anio: p.release_date ? p.release_date.split("-")[0] : "N/A",
      portada: p.poster_path
        ? `https://image.tmdb.org/t/p/w500${p.poster_path}`
        : PORTADA_GENERICA,
    }));

    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: "Error en la búsqueda de TMDb" });
  }
});

// GET: Leer catálogo completo
app.get("/api/peliculas", async (req, res) => {
  const peliculas = await leerPeliculas();
  res.json(peliculas);
});

// POST: Añadir película CON CONTROL ANTI-DUPLICADOS STRICTO
app.post("/api/peliculas", async (req, res) => {
  const { titulo, director, anio, portada } = req.body;

  if (!titulo || !director) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const peliculas = await leerPeliculas();

  // 🛡️ FILTRO ANTI-DUPLICADOS: Normaliza ambos lados antes de comparar
  const tituloLimpio = normalizarTexto(titulo);
  const existe = peliculas.some(
    (p) => normalizarTexto(p.titulo) === tituloLimpio
  );

  if (existe) {
    return res.status(400).json({ error: "¡Esta película ya existe en tu catálogo!" });
  }

  const imagenPortada = portada || (await obtenerPortada(titulo));

  const nuevaPelicula = {
    id: peliculas.length > 0 ? Math.max(...peliculas.map((p) => p.id)) + 1 : 1,
    titulo: titulo.trim(),
    director: director.trim(),
    anio: anio || null,
    portada: imagenPortada,
  };

  peliculas.push(nuevaPelicula);
  await guardarPeliculas(peliculas);

  res.status(201).json(nuevaPelicula);
});

// PUT: Actualizar
app.put("/api/peliculas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, director, anio } = req.body;

  let peliculas = await leerPeliculas();
  const pelicula = peliculas.find((p) => p.id === id);

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  if (pelicula.titulo !== titulo) {
    pelicula.portada = await obtenerPortada(titulo);
  }

  pelicula.titulo = titulo.trim();
  pelicula.director = director.trim();
  if (anio) pelicula.anio = anio;

  await guardarPeliculas(peliculas);
  res.json(pelicula);
});

// DELETE: Eliminar
app.delete("/api/peliculas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let peliculas = await leerPeliculas();

  const index = peliculas.findIndex((p) => p.id === id);

  if (index !== -1) {
    peliculas.splice(index, 1);
    await guardarPeliculas(peliculas);
    res.json({ mensaje: "Película eliminada del catálogo" });
  } else {
    res.status(404).json({ error: "Película no encontrada" });
  }
});

//===============================================
//4. ARRANQUE
//===============================================
app.listen(3000, () => {
  console.log("🎬 Servidor de películas listo en el puerto 3000 (CORS Activado)");
});
