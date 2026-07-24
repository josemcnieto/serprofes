const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'libros.json');

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// Servir la interfaz estática (index.html)
app.use(express.static(__dirname));

// --- FUNCIONES DE LECTURA Y ESCRITURA ---
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

// --- RUTAS DE LA API REST (/api/libros y /libros) ---

// 1. GET (Obtener todos los libros)
app.get(['/api/libros', '/libros'], async (req, res) => {
  try {
    const libros = await leerLibros();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer la base de datos' });
  }
});

// 2. POST (Crear libro)
app.post(['/api/libros', '/libros'], async (req, res) => {
  try {
    const { titulo, autor, anio } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({ error: 'El título y el autor son obligatorios' });
    }

    const libros = await leerLibros();
    const nuevoLibro = {
      id: Date.now(), // Genera un ID numérico único
      titulo: String(titulo).trim(),
      autor: String(autor).trim(),
      anio: Number(anio) || null,
      disponible: true
    };

    libros.push(nuevoLibro);
    await guardarLibros(libros);

    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el libro' });
  }
});

// 3. PUT (Editar libro por ID)
app.put(['/api/libros/:id', '/libros/:id'], async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, autor, anio } = req.body;

    const libros = await leerLibros();
    // Comparamos usando == para dar margen si un id viene como String o Number
    const index = libros.findIndex(l => l.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Actualizamos manteniendo la estructura
    libros[index] = {
      ...libros[index],
      ...(titulo !== undefined && { titulo: String(titulo).trim() }),
      ...(autor !== undefined && { autor: String(autor).trim() }),
      ...(anio !== undefined && { anio: Number(anio) })
    };

    await guardarLibros(libros);
    res.json(libros[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

// 4. DELETE (Eliminar libro por ID)
app.delete(['/api/libros/:id', '/libros/:id'], async (req, res) => {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();

    const libroExiste = libros.some(l => l.id == id);
    if (!libroExiste) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const librosFiltrados = libros.filter(l => l.id != id);
    await guardarLibros(librosFiltrados);

    res.json({ mensaje: 'Libro eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
});

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// --- INICIALIZACIÓN ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
