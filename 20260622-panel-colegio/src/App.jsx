import { useState, useEffect } from "react";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [idEditandoEstudiante, setIdEditandoEstudiante] = useState(null);

  const [profesores, setProfesores] = useState([]);
  const [nombreProfesor, setNombreProfesor] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [idEditandoProfesor, setIdEditandoProfesor] = useState(null);

  const API_ESTUDIANTES = "http://localhost:3000/api/estudiantes";
  const API_PROFESORES = "http://localhost:3000/api/profesores";

  useEffect(() => {
    obtenerEstudiantes();
    obtenerProfesores();
  }, []);

  const obtenerEstudiantes = async () => {
    try {
      const r = await fetch(API_ESTUDIANTES);
      const d = await r.json();
      setEstudiantes(d);
    } catch (e) {
      console.error(e);
    }
  };

  const manejarEnvioEstudiante = async (e) => {
    e.preventDefault();
    const datos = { nombre, curso };
    try {
      if (idEditandoEstudiante) {
        const r = await fetch(`${API_ESTUDIANTES}/${idEditandoEstudiante}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        if (r.ok) {
          setIdEditandoEstudiante(null);
          setNombre("");
          setCurso("");
          obtenerEstudiantes();
        }
      } else {
        const r = await fetch(API_ESTUDIANTES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        if (r.ok) {
          setNombre("");
          setCurso("");
          obtenerEstudiantes();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const seleccionarEstudianteParaEditar = (est) => {
    setIdEditandoEstudiante(est.id);
    setNombre(est.nombre);
    setCurso(est.curso);
  };

  const cancelarEdicionEstudiante = () => {
    setIdEditandoEstudiante(null);
    setNombre("");
    setCurso("");
  };

  const manejarBorradoEstudiante = async (id) => {
    try {
      const r = await fetch(`${API_ESTUDIANTES}/${id}`, { method: "DELETE" });
      if (r.ok) {
        if (idEditandoEstudiante === id) cancelarEdicionEstudiante();
        obtenerEstudiantes();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const obtenerProfesores = async () => {
    try {
      const r = await fetch(API_PROFESORES);
      const d = await r.json();
      setProfesores(d);
    } catch (e) {
      console.error(e);
    }
  };

  const manejarEnvioProfesor = async (e) => {
    e.preventDefault();
    const datos = { nombre: nombreProfesor, asignatura };
    try {
      if (idEditandoProfesor) {
        const r = await fetch(`${API_PROFESORES}/${idEditandoProfesor}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        if (r.ok) {
          setIdEditandoProfesor(null);
          setNombreProfesor("");
          setAsignatura("");
          obtenerProfesores();
        }
      } else {
        const r = await fetch(API_PROFESORES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        if (r.ok) {
          setNombreProfesor("");
          setAsignatura("");
          obtenerProfesores();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const seleccionarProfesorParaEditar = (prof) => {
    setIdEditandoProfesor(prof.id);
    setNombreProfesor(prof.nombre);
    setAsignatura(prof.asignatura);
  };

  const cancelarEdicionProfesor = () => {
    setIdEditandoProfesor(null);
    setNombreProfesor("");
    setAsignatura("");
  };

  const manejarBorradoProfesor = async (id) => {
    try {
      const r = await fetch(`${API_PROFESORES}/${id}`, { method: "DELETE" });
      if (r.ok) {
        if (idEditandoProfesor === id) cancelarEdicionProfesor();
        obtenerProfesores();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-10 text-center">
        Centro Educativo - Panel de Control
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* COLUMNA 1: ESTUDIANTES */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-xl font-black text-indigo-900 mb-6 border-b pb-2">
            Sección Alumnos
          </h2>

          <div className={`${idEditandoEstudiante ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'} border rounded-xl p-4 mb-6`}>
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              {idEditandoEstudiante ? "Modificar Alumno" : "Matricular Alumno"}
            </h3>
            <form onSubmit={manejarEnvioEstudiante} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre del alumno"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Curso (ej. 2º Bachillerato)"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <div className="flex gap-2">
                <button type="submit" className={`flex-1 ${idEditandoEstudiante ? 'bg-amber-600' : 'bg-indigo-600'} text-white font-medium text-sm py-2 rounded-lg`}>
                  {idEditandoEstudiante ? "Actualizar" : "Guardar"}
                </button>
                {idEditandoEstudiante && (
                  <button type="button" onClick={cancelarEdicionEstudiante} className="bg-slate-200 text-slate-700 font-medium text-sm px-4 py-2 rounded-lg">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              Lista de Estudiantes ({estudiantes.length})
            </h3>
            {estudiantes.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-6 border border-dashed rounded-xl">No hay estudiantes.</p>
            ) : (
              <ul className="divide-y divide-slate-100 border rounded-xl bg-white max-h-96 overflow-y-auto">
                {estudiantes.map((est) => (
                  <li key={est.id} className="flex justify-between items-center p-3 hover:bg-slate-50">
                    <div className="text-xs">
                      <span className="font-semibold text-slate-900 block">{est.nombre}</span>
                      <span className="text-slate-500">{est.curso}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => seleccionarEstudianteParaEditar(est)} className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Modificar
                      </button>
                      <button onClick={() => manejarBorradoEstudiante(est.id)} className="bg-rose-50 text-rose-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* COLUMNA 2: PROFESORES */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-xl font-black text-violet-900 mb-6 border-b pb-2">
            Sección Profesores
          </h2>

          <div className={`${idEditandoProfesor ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'} border rounded-xl p-4 mb-6`}>
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              {idEditandoProfesor ? "Modificar Profesor" : "Registrar Profesor"}
            </h3>
            <form onSubmit={manejarEnvioProfesor} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre del profesor"
                value={nombreProfesor}
                onChange={(e) => setNombreProfesor(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Asignatura"
                value={asignatura}
                onChange={(e) => setAsignatura(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <div className="flex gap-2">
                <button type="submit" className={`flex-1 ${idEditandoProfesor ? 'bg-amber-600' : 'bg-violet-600'} text-white font-medium text-sm py-2 rounded-lg`}>
                  {idEditandoProfesor ? "Actualizar" : "Guardar"}
                </button>
                {idEditandoProfesor && (
                  <button type="button" onClick={cancelarEdicionProfesor} className="bg-slate-200 text-slate-700 font-medium text-sm px-4 py-2 rounded-lg">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              Cuerpo Docente ({profesores.length})
            </h3>
            {profesores.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-6 border border-dashed rounded-xl">No hay profesores.</p>
            ) : (
              <ul className="divide-y divide-slate-100 border rounded-xl bg-white max-h-96 overflow-y-auto">
                {profesores.map((prof) => (
                  <li key={prof.id} className="flex justify-between items-center p-3 hover:bg-slate-50">
                    <div className="text-xs">
                      <span className="font-semibold text-slate-900 block">{prof.nombre}</span>
                      <span className="text-violet-600 font-medium">{prof.asignatura}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => seleccionarProfesorParaEditar(prof)} className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Modificar
                      </button>
                      <button onClick={() => manejarBorradoProfesor(prof.id)} className="bg-rose-50 text-rose-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
