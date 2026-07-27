const express = require("express");
const cors = require("cors");
const fs = require("fs"); // Importamos el módulo File System

const app = express();
const PORT = 3000;
const ARCHIVO_DATOS = "./libros.json";

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================
app.use(cors());          // Permite que el frontend en HTML se conecte sin bloqueos
app.use(express.json());  // Permite leer el body de las peticiones POST en formato JSON

// ==========================================
// FUNCIÓN AUXILIAR (Opcional pero recomendada para evitar crasheos)
// Si el archivo no existe, lo crea automáticamente con un array vacío.
// ==========================================
function inicializarArchivo() {
    if (!fs.existsSync(ARCHIVO_DATOS)) {
        fs.writeFileSync(ARCHIVO_DATOS, "[]");
    }
}

// ==========================================
// RUTAS DE LA API (Endpoints)
// ==========================================

// 1. LECTURA (GET) - Enviar todos los libros al frontend
app.get("/api/libros", (req, res) => {
    try {
        inicializarArchivo(); // Aseguramos que el archivo existe
        
        // Leemos el archivo físico
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
        const libros = JSON.parse(data); // Convertimos el texto a JavaScript
        
        res.status(200).json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor al leer los libros." });
    }
});

// 2. CREACIÓN (POST) - Guardar un nuevo libro validado
app.post("/api/libros", (req, res) => {
    const { titulo, autor, anio } = req.body;

    // VALIDACIÓN ESTRICTA: El Portero
    if (!titulo || !autor || !anio) {
        return res.status(400).json({ error: "Faltan datos obligatorios (título, autor o año)." });
    }

    try {
        inicializarArchivo();
        
        // 1. Leer los datos actuales
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
        const libros = JSON.parse(data);

        // 2. Crear el nuevo ID (autoincremental)
        const nuevoId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;

        // 3. Construir el nuevo objeto libro
        const nuevoLibro = {
            id: nuevoId,
            titulo: titulo,
            autor: autor,
            anio: parseInt(anio)
        };

        // 4. Añadirlo al array y sobrescribir el archivo físico
        libros.push(nuevoLibro);
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(libros, null, 2));

        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor al guardar el libro." });
    }
});

// 4. ACTUALIZACIÓN (PUT) - Editar un libro existente por su ID
app.put("/api/libros/:id", (req, res) => {
    const idParametro = parseInt(req.params.id);
    const { titulo, autor, anio } = req.body;

    try {
        inicializarArchivo();

        // 1. Leer los datos actuales
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
        let libros = JSON.parse(data);

        // 2. Buscar la posición (índice) del libro en el array
        const index = libros.findIndex(libro => libro.id === idParametro);

        // 3. Si no existe, devolvemos un Error 404 (Not Found)
        if (index === -1) {
            return res.status(404).json({ error: "Libro no encontrado en la base de datos." });
        }

        // 4. Actualizar solo los datos que el cliente haya enviado
        if (titulo) libros[index].titulo = titulo;
        if (autor) libros[index].autor = autor;
        if (anio) libros[index].anio = parseInt(anio);

        // 5. Sobrescribir el archivo físico con el array actualizado
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(libros, null, 2));

        // 6. Responder con el libro actualizado
        res.status(200).json(libros[index]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor al actualizar el libro." });
    }
});

// 3. ELIMINACIÓN (DELETE) - Borrar un libro por su ID
app.delete("/api/libros/:id", (req, res) => {
    const idParametro = parseInt(req.params.id);

    try {
        inicializarArchivo();

        // 1. Leer los datos actuales
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
        let libros = JSON.parse(data);

        // 2. Filtrar el array para quedarnos con todos MENOS el que queremos borrar
        const librosRestantes = libros.filter(libro => libro.id !== idParametro);

        // 3. Sobrescribir el archivo con el nuevo array (sin el libro borrado)
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(librosRestantes, null, 2));

        res.status(200).json({ mensaje: "Libro eliminado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor al eliminar el libro." });
    }
});

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor de Biblioteca operativo en http://localhost:${PORT}`);
    console.log(`📂 Persistencia activada en: ${ARCHIVO_DATOS}`);
});


