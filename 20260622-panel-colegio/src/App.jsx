import { useState, useEffect } from "react";

function App() {
  // 1. ESTADOS: Variables de React que actualizan la pantalla automáticamente
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");

  // URL exacta de nuestra API de estudiantes
  const API_URL = "http://localhost:3000/api/estudiantes";

  // ==========================================
  // OPERACIÓN GET: LEER ESTUDIANTES
  // ==========================================
  const obtenerEstudiantes = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setEstudiantes(datos); // Guardamos los datos en React
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Esto hace que la lista se pida al servidor nada más abrir la página
  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  // ==========================================
  // OPERACIÓN POST: GUARDAR ESTUDIANTE
  // ==========================================
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Creamos el paquete de datos que enviaremos al backend
    const nuevoEstudiante = { nombre, curso };

    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEstudiante), // Transformamos a texto JSON
      });

      if (respuesta.ok) {
        setNombre(""); // Limpiamos la caja de nombre
        setCurso(""); // Limpiamos la caja de curso
        obtenerEstudiantes(); // Volvemos a pedir la lista actualizada
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // ==========================================
  // OPERACIÓN DELETE: BORRAR ESTUDIANTE
  // ==========================================
  const manejarBorrado = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (respuesta.ok) {
        obtenerEstudiantes(); // Refrescamos la lista tras borrar
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  // ==========================================
  // LO QUE SE VE EN PANTALLA (INTERFAZ CORREGIDA)
  // ==========================================
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Panel de Gestión de Estudiantes</h1>

      {/* FORMULARIO */}
      <form onSubmit={manejarEnvio} style={{ marginBottom: "20px" }}>
        <h3>Añadir Estudiante</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 15px", cursor: "pointer" }}>
          Guardar
        </button>
      </form>

      {/* LISTA DE ESTUDIANTES */}
      <h3>Lista de Clase</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.id} style={{ marginBottom: "10px" }}>
            <span>
              ID {estudiante.id}: {estudiante.nombre} - {estudiante.curso}
            </span>{" "}
            <button
              onClick={() => manejarBorrado(estudiante.id)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "3px",
                marginLeft: "10px"
              }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
