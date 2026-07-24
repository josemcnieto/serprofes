const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'libros.json');

// --- CRÍTICO PARA EL FRONTEND ---
app.use(cors()); // Habilita CORS para todas las peticiones
app.use(express.json()); // Procesa los datos JSON enviados por el formulario

// Servir la carpeta estática si pusiste ahí tu index.html
app.use(express.static(__dirname));

async function leerLibros() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
}

async function guardarLibros(libros) {
  await fs.writeFile(DB_PATH, JSON.stringify(libros, null, 2), 'utf-8');
}

// Servir tanto /libros como /api/libros por si el frontend busca en cualquiera de los dos
const rutas = ['/libros', '/api/libros'];

rutas.forEach(ruta => {
  // GET
  app.get(ruta, async (req, res) => {
    try {
      const libros = await leerLibros();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error al leer la base de datos' });
    }
  });

  // POST (soporta titulo, autor y anio / anioPublicacion)
  app.post(ruta, async (req, res) => {
    try {
      const { titulo, autor, anio, anioPublicacion, year } = req.body;

      if (!titulo || !autor) {
        return res.status(400).json({ error: 'Título y autor son obligatorios' });
      }

      const libros = await leerLibros();
      const nuevoLibro = {
        id: Date.now(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        anio: anio || anioPublicacion || year || null,
        disponible: true
      };

      libros.push(nuevoLibro);
      await guardarLibros(libros);

      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el libro' });
    }
  });
});

// DELETE y PUT genéricos
app.delete(['/libros/:id', '/api/libros/:id'], async (req, res) => {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();
    const filtrados = libros.filter(l => l.id !== id);
    await guardarLibros(filtrados);
    res.json({ mensaje: 'Libro eliminado' });
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
