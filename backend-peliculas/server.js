const express = require("express"); 
const cors = require("cors"); 
const app = express(); 
const PORT = 3000; 

// 1. ZONA DE MIDDLEWARES GLOBALES
app.use(cors());          
app.use(express.json()); 

// 2. REPOSITORIO DE DATOS EN MEMORIA
let peliculas = [ 
  { id: 1, titulo: "Matrix", director: "Lana Wachowski", anio: 1999 }, 
  { id: 2, titulo: "Interstellar", director: "Christopher Nolan", anio: 2014 } 
]; 

// 3. RUTAS Y ENDPOINTS

// GET: Obtener todas las películas
app.get("/api/peliculas", (req, res) => {
  res.json(peliculas);
});

// POST: Crear nueva película
app.post("/api/peliculas", (req, res) => { 
    const { titulo, director, anio } = req.body; 
 
    if (!titulo || !director || !anio) { 
        return res.status(400).json({ error: "Faltan propiedades obligatorias: titulo, director y anio son requeridos." }); 
    } 
 
    const nuevoId = peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1; 
 
    const nuevaPelicula = { 
        id: nuevoId, 
        titulo: titulo, 
        director: director, 
        anio: parseInt(anio) 
    }; 
 
    peliculas.push(nuevaPelicula); 
    res.status(201).json({ mensaje: "Recurso creado con éxito", pelicula: nuevaPelicula }); 
});

// DELETE: Eliminar película por ID
app.delete("/api/peliculas/:id", (req, res) => { 
    const idParametro = parseInt(req.params.id); 
    const indice = peliculas.findIndex(p => p.id === idParametro); 
 
    if (indice === -1) { 
        return res.status(404).json({ error: "No se encontró ninguna película con el ID especificado." }); 
    } 
 
    peliculas.splice(indice, 1); 
    res.status(200).json({ mensaje: "El recurso ha sido eliminado correctamente del catálogo." }); 
});

// 4. DECLARACIÓN DE ENTRADA AL SERVIDOR (Siempre al final de todo)
app.listen(PORT, () => { 
  console.log(`☑ Servidor de películas operativo con éxito en http://localhost:${PORT}`); 
});
