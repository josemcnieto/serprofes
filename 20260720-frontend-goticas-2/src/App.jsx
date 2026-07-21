import { useState, useEffect } from 'react';

function App() {
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionadaId, setRutaSeleccionadaId] = useState('');
  const [detalleRuta, setDetalleRuta] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 1. Cargar el listado para el desplegable
  useEffect(() => {
    fetch('http://localhost:5000/api/rutas')
      .then((res) => res.json())
      .then((data) => {
        setRutas(data);
        if (data.length > 0) {
          setRutaSeleccionadaId(data[0].id);
        }
      })
      .catch((err) => console.error('Error al cargar la lista de rutas:', err));
  }, []);

  // 2. Cargar los detalles de la ruta seleccionada
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
    <div style={{
      maxWidth: '850px',
      margin: '20px auto',
      padding: '25px 30px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      borderRadius: '12px',
      color: '#2c3e50',
      textAlign: 'left'
    }}>
      
      {/* Encabezado CENTRADO */}
      <header style={{
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '16px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '1.45rem',
          fontWeight: '800',
          margin: '0 0 12px 0',
          color: '#0f172a',
          letterSpacing: '-0.3px',
          width: '100%'
        }}>
          🏰 Rutas por las Catedrales Góticas de España
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <label htmlFor="select-ruta" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#334155' }}>
            Seleccionar Ruta:
          </label>
          <select
            id="select-ruta"
            value={rutaSeleccionadaId}
            onChange={(e) => setRutaSeleccionadaId(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '0.9rem',
              borderRadius: '6px',
              border: '1px solid #94a3b8',
              backgroundColor: '#ffffff',
              color: '#1e293b',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {rutas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>
      </header>

      {cargando && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
          <i>Cargando información de la ruta...</i>
        </div>
      )}

      {/* Detalle de la Ruta */}
      {detalleRuta && !cargando && (
        <main>
          {/* Primera Caja: Azul más suave (#4a72c4) */}
          <section style={{
            backgroundColor: '#4a72c4',
            color: '#ffffff',
            padding: '16px 20px',
            borderRadius: '10px',
            marginBottom: '22px',
            boxShadow: '0 3px 8px rgba(74, 114, 196, 0.2)'
          }}>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#ffffff', fontWeight: '700' }}>
              {detalleRuta.nombre}
            </h2>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#f0f4ff', lineHeight: '1.45' }}>
              {detalleRuta.descripcion}
            </p>
          </section>

          {/* Cajas de las Catedrales: Azul #668CDE */}
          <section style={{ marginBottom: '22px' }}>
            <h3 style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: '#64748b',
              marginBottom: '12px',
              fontWeight: '700'
            }}>
              Catedrales en esta ruta
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {detalleRuta.catedrales.map((cat, index) => (
                <div
                  key={index}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#668CDE',
                    color: '#ffffff',
                    boxShadow: '0 2px 6px rgba(102, 140, 222, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#ffffff' }}>
                      {cat.nombre}
                    </span>
                    {cat.sobrenombre && (
                      <span style={{
                        fontSize: '0.72rem',
                        backgroundColor: '#ffffff',
                        color: '#3b5998',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: '700'
                      }}>
                        {cat.sobrenombre}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#f7fafc', lineHeight: '1.4' }}>
                    {cat.caracteristicas}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Botón de Google Maps en azul más fuerte (#1d4ed8) */}
          <section style={{
            borderTop: '1px dashed #cbd5e0',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: '600', fontSize: '0.92rem', color: '#334155' }}>
              📍 Mapa del recorrido
            </span>
            <a
              href={detalleRuta.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 18px',
                backgroundColor: '#1d4ed8',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '700',
                boxShadow: '0 3px 8px rgba(29, 78, 216, 0.35)'
              }}
            >
              Abrir Ruta en Google Maps ↗
            </a>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
