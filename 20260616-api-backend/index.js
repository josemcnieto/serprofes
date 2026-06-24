const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON y conectar con tu React en el puerto 5173
app.use(cors());
app.use(express.json());

// Bases de datos simuladas en memoria
let estudiantes = [
  { id: 1, nombre: "Aroa", curso: "React" },
  { id: 2, nombre: "Jose", curso: "Node" }
];

let profesores = [
  { id: 1, nombre: "Carlos", asignatura: "Matemáticas" }
];

// ==========================================
// RUTAS DE ESTUDIANTES
// ==========================================

// 1. Obtener todos
app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

// 2. Añadir uno nuevo
app.post('/api/estudiantes', (req, res) => {
  const nuevoEstudiante = {
    id: estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1,
    nombre: req.body.nombre,
    curso: req.body.curso
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

// 3. Modificar uno existente
app.put('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);
  
  if (index !== -1) {
    estudiantes[index] = {
      id: id,
      nombre: req.body.nombre || estudiantes[index].nombre,
      curso: req.body.curso || estudiantes[index].curso
    };
    res.json(estudiantes[index]);
  } else {
    res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }
});

// 4. Borrar uno
app.delete('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);
  
  if (index !== -1) {
    estudiantes.splice(index, 1);
    res.json({ mensaje: "Estudiante eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }
});

// ==========================================
// RUTAS DE PROFESORES
// ==========================================

// 1. Obtener todos
app.get('/api/profesores', (req, res) => {
  res.json(profesores);
});

// 2. Añadir uno nuevo
app.post('/api/profesores', (req, res) => {
  const nuevoProfesor = {
    id: profesores.length > 0 ? Math.max(...profesores.map(p => p.id)) + 1 : 1,
    nombre: req.body.nombre,
    asignatura: req.body.asignatura
  };
  profesores.push(nuevoProfesor);
  res.status(201).json(nuevoProfesor);
});

// 3. Modificar uno existente
app.put('/api/profesores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = profesores.findIndex(p => p.id === id);
  
  if (index !== -1) {
    profesores[index] = {
      id: id,
      nombre: req.body.nombre || profesores[index].nombre,
      asignatura: req.body.asignatura || profesores[index].asignatura
    };
    res.json(profesores[index]);
  } else {
    res.status(404).json({ mensaje: "Profesor no encontrado" });
  }
});

// 4. Borrar uno
app.delete('/api/profesores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = profesores.findIndex(p => p.id === id);
  
  if (index !== -1) {
    profesores.splice(index, 1);
    res.json({ mensaje: "Profesor eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Profesor no encontrado" });
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
