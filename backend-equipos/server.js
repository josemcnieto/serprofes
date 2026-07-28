const express = require("express"); 
const cors = require("cors"); 
const fs = require("fs"); // Módulo nativo File System para leer/escribir archivos 

const app = express(); 
const PORT = 3000; 
const ARCHIVO_DATOS = "./equipos.json"; 

// ========================================== 
// MIDDLEWARES GLOBALES (Configuración básica) 
// ========================================== 
app.use(cors());          // Abre los permisos para que el HTML no sea bloqueado 
app.use(express.json());  // Permite procesar los datos JSON en el cuerpo de las peticiones 

// ========================================== 
// FUNCIÓN AUXILIAR DE SEGURIDAD 
// ========================================== 
function inicializarArchivo() { 
    if (!fs.existsSync(ARCHIVO_DATOS)) { 
        fs.writeFileSync(ARCHIVO_DATOS, "[]"); 
    } 
} 

// ========================================== 
// RUTAS DE LA API (Endpoints del Contrato) 
// ========================================== 

// 1. LECTURA (GET) - Enviar todos los equipos al cliente 
app.get("/api/equipos", (req, res) => { 
    try { 
        inicializarArchivo(); 
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8"); 
        const equipos = JSON.parse(data); 
        res.status(200).json(equipos); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "Error interno del servidor al leer los equipos." }); 
    } 
}); 

// 2. CREACIÓN (POST) - Guardar un nuevo equipo con validación estricta 
app.post("/api/equipos", (req, res) => { 
    const { nombre, marca } = req.body; 

    // Validación: Si falta alguno de los campos obligatorios 
    if (!nombre || !marca) { 
        return res.status(400).json({ error: "Faltan datos obligatorios (nombre o marca)." }); 
    } 

    try { 
        inicializarArchivo(); 
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8"); 
        const equipos = JSON.parse(data); 

        // Generar ID único incremental 
        const nuevoId = equipos.length > 0 ? equipos[equipos.length - 1].id + 1 : 1; 

        const nuevoEquipo = { 
            id: nuevoId, 
            nombre: nombre, 
            marca: marca 
        }; 

        equipos.push(nuevoEquipo); 
        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(equipos, null, 2)); 

        res.status(201).json(nuevoEquipo); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "Error interno del servidor al guardar el equipo." }); 
    } 
}); 

// 3. ACTUALIZACIÓN (PUT) - Modificar un equipo por su ID 
app.put("/api/equipos/:id", (req, res) => { 
    const idParametro = parseInt(req.params.id); 
    const { nombre, marca } = req.body; 

    try { 
        inicializarArchivo(); 
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8"); 
        let equipos = JSON.parse(data); 

        const index = equipos.findIndex(equipo => equipo.id === idParametro); 

        if (index === -1) { 
            return res.status(404).json({ error: "Equipo no encontrado en la base de datos." }); 
        } 

        if (nombre) equipos[index].nombre = nombre; 
        if (marca) equipos[index].marca = marca; 

        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(equipos, null, 2)); 

        res.status(200).json(equipos[index]); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "Error interno del servidor al actualizar el equipo." }); 
    } 
}); 

// 4. ELIMINACIÓN (DELETE) - Retirar un equipo por su ID 
app.delete("/api/equipos/:id", (req, res) => { 
    const idParametro = parseInt(req.params.id); 

    try { 
        inicializarArchivo(); 
        const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8"); 
        let equipos = JSON.parse(data); 

        const equiposRestantes = equipos.filter(equipo => equipo.id !== idParametro); 

        fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(equiposRestantes, null, 2)); 

        res.status(200).json({ mensaje: "Equipo eliminado correctamente." }); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "Error interno del servidor al eliminar el equipo." }); 
    } 
}); 

// ========================================== 
// ARRANQUE DEL SERVIDOR 
// ========================================== 
app.listen(PORT, () => { 
    console.log(`\n✅ Servidor de Equipos Informáticos operativo en http://localhost:${PORT}`); 
    console.log(`📂 Persistencia activada en: ${ARCHIVO_DATOS}\n`); 
});
