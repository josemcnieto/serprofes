// =========================================================
// CONFIGURACIÓN
// =========================================================
const URL_API = "http://localhost:3000/api/rutas-goticas";

const elListado = document.getElementById("listado-rutas");
const elMensajeVacio = document.getElementById("mensaje-vacio");
const elBanner = document.getElementById("banner-estado");
const elStatRutas = document.getElementById("stat-rutas");
const elStatCatedrales = document.getElementById("stat-catedrales");
const elStatKm = document.getElementById("stat-km");

const elModal = document.getElementById("modal-formulario");
const elFormulario = document.getElementById("formulario-ruta");
const elModalTitulo = document.getElementById("modal-titulo");
const elListaCatedralesForm = document.getElementById("lista-catedrales-form");
const plantillaFilaCatedral = document.getElementById("plantilla-fila-catedral");

let rutasEnMemoria = [];

// =========================================================
// ROSETÓN DECORATIVO (SVG generado)
// =========================================================
function polarACartesiano(cx, cy, r, gradosAngulo) {
  const rad = ((gradosAngulo - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function construirRosetón() {
  const cx = 100, cy = 100;
  const numPétalos = 16;
  const paso = 360 / numPétalos;
  let pétalos = "";

  for (let i = 0; i < numPétalos; i++) {
    const inicio = polarACartesiano(cx, cy, 92, i * paso);
    const fin = polarACartesiano(cx, cy, 92, (i + 1) * paso);
    const color = i % 2 === 0 ? "var(--rojo)" : "var(--oro)";
    pétalos += `<path d="M${cx},${cy} L${inicio.x.toFixed(2)},${inicio.y.toFixed(2)} A92,92 0 0,1 ${fin.x.toFixed(2)},${fin.y.toFixed(2)} Z" fill="${color}" opacity="0.9"/>`;
  }

  const svg = `
  <svg viewBox="0 0 200 200" class="rosetón-giro" role="img" aria-label="Rosetón gótico decorativo">
    <circle cx="100" cy="100" r="96" fill="var(--tinta)"/>
    <g>${pétalos}</g>
    <circle cx="100" cy="100" r="60" fill="var(--piedra-panel)"/>
    <circle cx="82" cy="100" r="18" fill="var(--tinta)" opacity="0.9"/>
    <circle cx="118" cy="100" r="18" fill="var(--tinta)" opacity="0.9"/>
    <circle cx="100" cy="82" r="18" fill="var(--tinta)" opacity="0.9"/>
    <circle cx="100" cy="118" r="18" fill="var(--tinta)" opacity="0.9"/>
    <circle cx="100" cy="100" r="12" fill="var(--oro)"/>
    <circle cx="100" cy="100" r="96" fill="none" stroke="var(--oro)" stroke-width="3"/>
  </svg>`;
  document.getElementById("hero-svg-wrap").innerHTML = svg;
}

function svgCuadrifolioMini() {
  return `<svg class="mini-cuadrifolio" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="14" cy="20" r="8"/><circle cx="26" cy="20" r="8"/>
    <circle cx="20" cy="14" r="8"/><circle cx="20" cy="26" r="8"/>
  </svg>`;
}

// =========================================================
// BANNER DE ESTADO
// =========================================================
function mostrarBanner(texto) {
  elBanner.textContent = texto;
  elBanner.classList.remove("oculto");
}
function ocultarBanner() {
  elBanner.classList.add("oculto");
}

// =========================================================
// LLAMADAS A LA API
// =========================================================
async function obtenerRutas() {
  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) throw new Error("No se pudo leer el listado de rutas.");
  return respuesta.json();
}

async function crearRuta(datos) {
  const respuesta = await fetch(URL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) throw new Error("No se pudo crear la ruta.");
  return respuesta.json();
}

async function actualizarRuta(id, datos) {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) throw new Error("No se pudo actualizar la ruta.");
  return respuesta.json();
}

async function eliminarRutaAPI(id) {
  const respuesta = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
  if (!respuesta.ok) throw new Error("No se pudo eliminar la ruta.");
  return respuesta.json();
}

// =========================================================
// RENDER DE TARJETAS
// =========================================================
function renderRutas() {
  elListado.innerHTML = "";

  if (rutasEnMemoria.length === 0) {
    elMensajeVacio.classList.remove("oculto");
  } else {
    elMensajeVacio.classList.add("oculto");
  }

  rutasEnMemoria.forEach((ruta, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const catedralesHtml = (ruta.catedrales || [])
      .map(
        (cat) => `
      <li>
        ${svgCuadrifolioMini()}
        <span>
          <span class="tarjeta__catedral-nombre">${escaparHtml(cat.nombre)}</span>
          <span class="tarjeta__catedral-hito">${escaparHtml(cat.hito || "")}</span>
        </span>
      </li>`
      )
      .join("");

    tarjeta.innerHTML = `
      <div class="tarjeta__ojiva">
        <span class="tarjeta__numero">N.º ${String(indice + 1).padStart(2, "0")}</span>
      </div>
      <div class="tarjeta__cuerpo">
        <h3 class="tarjeta__titulo">${escaparHtml(ruta.nombre)}</h3>
        <div class="tarjeta__linea-divisoria"></div>
        <div class="tarjeta__datos">
          <div class="tarjeta__dato"><span>Duración</span><span>${ruta.duracionDias} días</span></div>
          <div class="tarjeta__dato"><span>Distancia</span><span>${ruta.distanciaKm} km</span></div>
          <div class="tarjeta__dato"><span>Catedrales</span><span>${(ruta.catedrales || []).length}</span></div>
        </div>
        <ul class="tarjeta__catedrales">${catedralesHtml || "<li>Sin catedrales registradas.</li>"}</ul>
        <div class="tarjeta__acciones">
          <button class="boton boton--linea" data-accion="editar" data-id="${ruta.id}" type="button">Editar</button>
          <button class="boton boton--linea" data-accion="eliminar" data-id="${ruta.id}" type="button">Eliminar</button>
        </div>
      </div>
    `;
    elListado.appendChild(tarjeta);
  });

  actualizarEstadisticas();
}

function actualizarEstadisticas() {
  const totalRutas = rutasEnMemoria.length;
  const totalCatedrales = rutasEnMemoria.reduce((acc, r) => acc + (r.catedrales || []).length, 0);
  const totalKm = rutasEnMemoria.reduce((acc, r) => acc + (Number(r.distanciaKm) || 0), 0);
  elStatRutas.textContent = totalRutas;
  elStatCatedrales.textContent = totalCatedrales;
  elStatKm.textContent = totalKm.toLocaleString("es-ES");
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

// =========================================================
// CARGA INICIAL
// =========================================================
async function cargarRutas() {
  try {
    rutasEnMemoria = await obtenerRutas();
    ocultarBanner();
    renderRutas();
  } catch (error) {
    console.error(error);
    mostrarBanner("No se pudo conectar con la API en " + URL_API + ". Comprueba que el backend (server.js) esté corriendo.");
    rutasEnMemoria = [];
    renderRutas();
  }
}

// =========================================================
// FORMULARIO — filas de catedrales
// =========================================================
function añadirFilaCatedral(nombre = "", hito = "") {
  const fragmento = plantillaFilaCatedral.content.cloneNode(true);
  const fila = fragmento.querySelector(".fila-catedral");
  fila.querySelector(".input-catedral-nombre").value = nombre;
  fila.querySelector(".input-catedral-hito").value = hito;
  fila.querySelector(".fila-catedral__quitar").addEventListener("click", () => fila.remove());
  elListaCatedralesForm.appendChild(fila);
}

document.getElementById("btn-añadir-catedral").addEventListener("click", () => añadirFilaCatedral());

function leerCatedralesDelFormulario() {
  return Array.from(elListaCatedralesForm.querySelectorAll(".fila-catedral"))
    .map((fila) => ({
      nombre: fila.querySelector(".input-catedral-nombre").value.trim(),
      hito: fila.querySelector(".input-catedral-hito").value.trim(),
    }))
    .filter((cat) => cat.nombre !== "");
}

// =========================================================
// MODAL — abrir / cerrar
// =========================================================
function abrirModal(rutaAEditar = null) {
  elFormulario.reset();
  elListaCatedralesForm.innerHTML = "";

  if (rutaAEditar) {
    elModalTitulo.textContent = "Editar ruta";
    document.getElementById("ruta-id").value = rutaAEditar.id;
    document.getElementById("ruta-nombre").value = rutaAEditar.nombre;
    document.getElementById("ruta-dias").value = rutaAEditar.duracionDias;
    document.getElementById("ruta-km").value = rutaAEditar.distanciaKm;
    (rutaAEditar.catedrales || []).forEach((cat) => añadirFilaCatedral(cat.nombre, cat.hito));
  } else {
    elModalTitulo.textContent = "Nueva ruta";
    document.getElementById("ruta-id").value = "";
    añadirFilaCatedral();
  }

  elModal.classList.remove("oculto");
  elModal.setAttribute("aria-hidden", "false");
  document.getElementById("ruta-nombre").focus();
}

function cerrarModal() {
  elModal.classList.add("oculto");
  elModal.setAttribute("aria-hidden", "true");
}

document.getElementById("btn-abrir-formulario").addEventListener("click", () => abrirModal());
document.getElementById("btn-primera-ruta").addEventListener("click", () => abrirModal());
document.getElementById("btn-cerrar-modal").addEventListener("click", cerrarModal);
document.getElementById("btn-cancelar-formulario").addEventListener("click", cerrarModal);
document.getElementById("modal-fondo").addEventListener("click", cerrarModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !elModal.classList.contains("oculto")) cerrarModal();
});

// =========================================================
// FORMULARIO — envío (crear / editar)
// =========================================================
elFormulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = document.getElementById("ruta-id").value;
  const datos = {
    nombre: document.getElementById("ruta-nombre").value.trim(),
    duracionDias: Number(document.getElementById("ruta-dias").value),
    distanciaKm: Number(document.getElementById("ruta-km").value),
    catedrales: leerCatedralesDelFormulario(),
  };

  const botonGuardar = document.getElementById("btn-guardar-ruta");
  botonGuardar.disabled = true;
  botonGuardar.textContent = "Guardando…";

  try {
    if (id) {
      await actualizarRuta(id, datos);
    } else {
      await crearRuta(datos);
    }
    cerrarModal();
    await cargarRutas();
  } catch (error) {
    console.error(error);
    mostrarBanner("No se pudo guardar la ruta. Comprueba que el backend esté corriendo.");
  } finally {
    botonGuardar.disabled = false;
    botonGuardar.textContent = "Guardar ruta";
  }
});

// =========================================================
// ACCIONES SOBRE TARJETAS (editar / eliminar)
// =========================================================
elListado.addEventListener("click", async (evento) => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const id = boton.dataset.id;
  const ruta = rutasEnMemoria.find((r) => String(r.id) === String(id));

  if (boton.dataset.accion === "editar" && ruta) {
    abrirModal(ruta);
  }

  if (boton.dataset.accion === "eliminar" && ruta) {
    const confirmado = window.confirm(`¿Eliminar "${ruta.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;
    try {
      await eliminarRutaAPI(id);
      await cargarRutas();
    } catch (error) {
      console.error(error);
      mostrarBanner("No se pudo eliminar la ruta. Comprueba que el backend esté corriendo.");
    }
  }
});

// =========================================================
// ARRANQUE
// =========================================================
construirRosetón();
cargarRutas();
