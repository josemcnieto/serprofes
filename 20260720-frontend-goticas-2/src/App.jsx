import { useState, useEffect } from 'react';

function App() {
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionadaId, setRutaSeleccionadaId] = useState('');
  const [detalleRuta, setDetalleRuta] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 1. Cargar el listado para el desplegable al montar el componente
  useEffect(() => {
    fetch('http://localhost:5000/api/rutas')
      .then((res) => res.json())
      .then((data) => {
        setRutas(data);
        if (data.length > 0) {
          setRutaSeleccionadaId(data[0].id); // Seleccionar la primera por defecto
        }
      })
      .catch((err) => console.error('Error al cargar la lista de rutas:', err));
  }, []);

  // 2. Cargar los detalles de la ruta cuando el usuario cambia el desplegable
  useEffect(() => {
    if (!rutaSeleccionadaId) return;

    setCargando(true);
    fetch(`http://localhost:5000/api/rutas/${rutaSeleccionadaId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetalleRuta(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar detalle:', err);
        setCargando(false);
      });
  }, [rutaSeleccionadaId]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🏰 Rutas por las Catedrales Góticas de España</h1>

      {/* Desplegable / Select */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="select-ruta" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Selecciona una Ruta:
        </label>
        <select
          id="select-ruta"
          value={rutaSeleccionadaId}
          onChange={(e) => setRutaSeleccionadaId(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '4px' }}
        >
          {rutas.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      </div>

      {cargando && <p>Cargando información de la ruta...</p>}

      {/* Detalle de la Ruta */}
      {detalleRuta && !cargando && (
        <div>
          <h2>{detalleRuta.nombre}</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>{detalleRuta.descripcion}</p>

          {/* Catedrales */}
          <h3>Catedrales que componen esta ruta:</h3>
          <div style={{ display: 'grid', gap: '15px', marginBottom: '25px' }}>
            {detalleRuta.catedrales.map((cat, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                  {cat.nombre} {cat.sobrenombre && <small>({cat.sobrenombre})</small>}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                  {cat.caracteristicas}
                </p>
              </div>
            ))}
          </div>

          {/* Enlace y Visualización del Mapa */}
          <h3>🗺️ Mapa de la Ruta</h3>
          <p>
            <a
              href={detalleRuta.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}
            >
              Abrir Ruta en Google Maps
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
