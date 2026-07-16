// ============================================
// FRONTEND - Catálogo de Videojuegos
// Práctica: "El Cliente Impaciente"
// PLANTILLA PARA EL ALUMNADO
//
// Este componente YA ESTÁ TERMINADO y funcionando.
// Vuestro reto es construir el backend (server.js) en Express
// para que las peticiones fetch de aquí abajo dejen de fallar.
// ============================================

import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/api/videojuegos';

function App() {
  // Estado con la lista de videojuegos que vienen del backend
  const [videojuegos, setVideojuegos] = useState([]);

  // Estados para controlar los inputs del formulario de creación
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');

  // Estado simple para mostrar un mensaje si el backend no responde
  const [error, setError] = useState(null);

  // -----------------------------------------
  // ESTADOS PARA LA EDICIÓN (PUT)
  // -----------------------------------------
  // editandoId guarda el id del juego que se está editando en este momento.
  // Si es null, ninguna tarjeta está en modo edición.
  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editGenero, setEditGenero] = useState('');

  // -----------------------------------------
  // CARGAR VIDEOJUEGOS AL MONTAR EL COMPONENTE
  // -----------------------------------------
  useEffect(() => {
    obtenerVideojuegos();
  }, []);

  const obtenerVideojuegos = () => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los videojuegos');
        return res.json();
      })
      .then((data) => {
        setVideojuegos(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con el servidor. ¿Está el backend encendido?');
      });
  };

  // -----------------------------------------
  // AÑADIR UN NUEVO VIDEOJUEGO (POST)
  // -----------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !genero.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, genero }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear el videojuego');
        return res.json();
      })
      .then((nuevoJuego) => {
        setVideojuegos((prev) => [...prev, nuevoJuego]);
        setTitulo('');
        setGenero('');
      })
      .catch((err) => console.error(err));
  };

  // -----------------------------------------
  // ELIMINAR UN VIDEOJUEGO (DELETE)
  // -----------------------------------------
  const handleEliminar = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar el videojuego');
        return res.json();
      })
      .then(() => {
        setVideojuegos((prev) => prev.filter((juego) => juego.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // -----------------------------------------
  // ENTRAR EN MODO EDICIÓN
  // -----------------------------------------
  // Guarda qué tarjeta se está editando y precarga los inputs
  // con los valores actuales de ese juego.
  const handleEditarClick = (juego) => {
    setEditandoId(juego.id);
    setEditTitulo(juego.titulo);
    setEditGenero(juego.genero);
  };

  // Cancela la edición sin guardar cambios
  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setEditTitulo('');
    setEditGenero('');
  };

  // -----------------------------------------
  // GUARDAR CAMBIOS DE UN VIDEOJUEGO (PUT)
  // -----------------------------------------
  const handleGuardarEdicion = (id) => {
    if (!editTitulo.trim() || !editGenero.trim()) return;

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: editTitulo, genero: editGenero }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al actualizar el videojuego');
        return res.json();
      })
      .then((juegoActualizado) => {
        // Reemplazamos en el estado local el juego editado por la versión actualizada
        setVideojuegos((prev) =>
          prev.map((juego) => (juego.id === id ? juegoActualizado : juego))
        );
        setEditandoId(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Catálogo de Videojuegos</h1>
        <p className="subtitle">El Cliente Impaciente está esperando su backend...</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* FORMULARIO PARA AÑADIR VIDEOJUEGOS */}
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título del videojuego"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button type="submit">Añadir juego</button>
      </form>

      {/* GRID DE TARJETAS DE VIDEOJUEGOS */}
      <main className="grid-videojuegos">
        {videojuegos.length === 0 && !error && (
          <p className="vacio">No hay videojuegos todavía. ¡Añade el primero!</p>
        )}

        {videojuegos.map((juego) => {
          const estaEditando = editandoId === juego.id;

          return (
            <div className="tarjeta" key={juego.id}>
              {estaEditando ? (
                // ---------- MODO EDICIÓN ----------
                <>
                  <input
                    type="text"
                    className="input-edicion"
                    value={editTitulo}
                    onChange={(e) => setEditTitulo(e.target.value)}
                    placeholder="Título del videojuego"
                  />
                  <input
                    type="text"
                    className="input-edicion"
                    value={editGenero}
                    onChange={(e) => setEditGenero(e.target.value)}
                    placeholder="Género"
                  />
                  <div className="acciones-tarjeta">
                    <button
                      className="btn-guardar"
                      onClick={() => handleGuardarEdicion(juego.id)}
                    >
                      Guardar
                    </button>
                    <button className="btn-cancelar" onClick={handleCancelarEdicion}>
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                // ---------- MODO NORMAL ----------
                <>
                  <h3>{juego.titulo}</h3>
                  <span className="genero-badge">{juego.genero}</span>
                  <div className="acciones-tarjeta">
                    <button className="btn-editar" onClick={() => handleEditarClick(juego)}>
                      Editar
                    </button>
                    <button className="btn-eliminar" onClick={() => handleEliminar(juego.id)}>
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
