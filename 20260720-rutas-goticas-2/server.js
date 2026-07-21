const express = require('express');
const cors = require('cors');
const rutasGoticas = require('./data/rutas');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint 1: Obtener el listado para el desplegable
app.get('/api/rutas', (req, res) => {
  const listaDesplegable = rutasGoticas.map(ruta => ({
    id: ruta.id,
    nombre: ruta.nombre
  }));
  res.json(listaDesplegable);
});

// Endpoint 2: Obtener la información completa de una ruta seleccionada
app.get('/api/rutas/:id', (req, res) => {
  const { id } = req.params;
  const rutaEncontrada = rutasGoticas.find(r => r.id === id);

  if (!rutaEncontrada) {
    return res.status(404).json({ mensaje: 'Ruta no encontrada' });
  }

  res.json(rutaEncontrada);
});

app.listen(PORT, () => {
  console.log(`Servidor de Catedrales Góticas corriendo en http://localhost:${PORT}`);
});
