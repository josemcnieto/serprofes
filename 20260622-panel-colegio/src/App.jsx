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
  // LO QUE SE VE EN PANTALLA (ESTILIZADO CON TAILWIND CSS)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-4 sm:p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8">
        
        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-8">
          Panel de Gestión de Estudiantes
        </h1>

        {/* SECCIÓN DEL FORMULARIO */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-4 bg-indigo-600 rounded-full inline-block"></span>
            Añadir Estudiante
          </h3>
          
          <form onSubmit={manejarEnvio} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nombre del alumno"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all shadow-sm placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="Curso (ej. 2º Bachillerato)"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all shadow-sm placeholder:text-slate-400"
            />
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </form>
        </div>

        {/* SECCIÓN DE LA LISTA */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-4 bg-emerald-500 rounded-full inline-block"></span>
            Lista de Clase
          </h3>
          
          {estudiantes.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6 bg-slate-25 rounded-xl border border-dashed border-slate-200">
              No hay estudiantes registrados actualmente.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
              {estudiantes.map((estudiante) => (
                <li 
                  key={estudiante.id} 
                  className="flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="inline-flex items-center justify-center bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md min-w-[2.5rem]">
                      ID {estudiante.id}
                    </span>
                    <div className="text-sm">
                      <span className="font-semibold text-slate-900">{estudiante.nombre}</span>
                      <span className="text-slate-400 mx-2 hidden sm:inline">•</span>
                      <span className="text-slate-500 block sm:inline">{estudiante.curso}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => manejarBorrado(estudiante.id)}
                    className="bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 hover:text-rose-700 text-xs font-semibold px-3 py-2 rounded-lg border border-rose-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
