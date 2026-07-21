// data/rutas.js
const rutasGoticas = [
  {
    id: "gotico-clasico",
    nombre: "Las Grandes Catedrales del Gótico Clásico (Siglo XIII)",
    descripcion: "Siguen el modelo francés (como Notre-Dame o Reims), caracterizadas por su gran altura, esbeltez y la búsqueda de la luz.",
    googleMapsUrl: "https://www.google.com/maps/dir/León+Cathedral/Burgos+Cathedral/Catedral+Primada+de+Toledo",
    catedrales: [
      {
        nombre: "Catedral de León (Santa María de Regla)",
        sobrenombre: "Pulchra Leonina",
        caracteristicas: "Máxima expresión del gótico clásico en España. Destaca por reducir sus muros al mínimo para integrar 1,765 m² de vidrieras medievales."
      },
      {
        nombre: "Catedral de Burgos (Santa María)",
        sobrenombre: "",
        caracteristicas: "Iniciada en 1221, destacan sus agujas caladas y cimborrio. Es la única catedral de España declarada Patrimonio de la Humanidad de forma individual por la UNESCO."
      },
      {
        nombre: "Catedral de Toledo (Santa María / Primada)",
        sobrenombre: "Dives Toledana",
        caracteristicas: "Ejemplo del gótico rico u opulento. Destaca por su planta de salón de cinco naves y una doble girola que resuelve el espacio curvo tras el altar."
      }
    ]
  },
  {
    id: "gotico-primitivo",
    nombre: "Gótico Primitivo y de Transición (Finales S. XII - Principios S. XIII)",
    descripcion: "Templos donde el gótico empezaba a asomar, conviviendo aún con la robustez del románico.",
    googleMapsUrl: "https://www.google.com/maps/dir/Catedral+de+Ávila/Catedral+de+Santa+María+de+Sigüenza/Catedral+de+Cuenca",
    catedrales: [
      {
        nombre: "Catedral de Ávila",
        sobrenombre: "Primera catedral gótica de España",
        caracteristicas: "Su cabecera está integrada directamente en las murallas de la ciudad, otorgándole un marcado carácter defensivo."
      },
      {
        nombre: "Catedral de Cuenca",
        sobrenombre: "",
        caracteristicas: "Influenciada por el arte anglonormando. Posee un triforio de arcos muy original decorado con estatuas de ángeles."
      },
      {
        nombre: "Catedral de Sigüenza",
        sobrenombre: "",
        caracteristicas: "De aspecto fortificado, muestra la transición del románico al gótico en sus bóvedas de crucería y grandes pilares."
      }
    ]
  },
  {
    id: "gotico-mediterraneo",
    nombre: "Gótico Mediterráneo o Catalán (Siglo XIV)",
    descripcion: "A diferencia del gótico castellano, busca la horizontalidad, sobriedad exterior, plantas diáfanas y naves de alturas similares.",
    googleMapsUrl: "https://www.google.com/maps/dir/Catedral+de+Girona/Catedral+de+Barcelona/Catedral+de+Valencia",
    catedrales: [
      {
        nombre: "Catedral de Palma de Mallorca (La Seu)",
        sobrenombre: "El Ojo del Gótico",
        caracteristicas: "Famosa por tener el rosetón más grande del mundo gótico (13 m de diámetro) y una nave de 44 metros de altura."
      },
      {
        nombre: "Catedral de Barcelona (Santa Cruz y Santa Eulalia)",
        sobrenombre: "",
        caracteristicas: "Ubicada en el Barrio Gótico, destaca por su sobriedad interior y un claustro del siglo XIV habitado por trece ocas blancas."
      },
      {
        nombre: "Catedral de Girona",
        sobrenombre: "",
        caracteristicas: "Posee la nave gótica más ancha del mundo (casi 23 metros), eliminando columnas intermedias."
      },
      {
        nombre: "Catedral de Valencia",
        sobrenombre: "",
        caracteristicas: "Combina varios estilos con estructura y cimborrio góticos, junto a su famosa torre campanario, el Miguelete (Micalet)."
      }
    ]
  },
  {
    id: "gotico-tardio",
    nombre: "Gótico Tardío o Flamboyante (Siglos XV - XVI)",
    descripcion: "Construidas en época de esplendor económico, llevan la decoración al extremo con bóvedas de crucería complejísimas.",
    googleMapsUrl: "https://www.google.com/maps/dir/Catedral+de+Segovia/Salamanca+Cathedral/Catedral+de+Sevilla",
    catedrales: [
      {
        nombre: "Catedral de Sevilla",
        sobrenombre: "",
        caracteristicas: "La catedral gótica con mayor superficie del mundo. Construida sobre la antigua Mezquita Aljama, conservando el Patio de los Naranjos y la Giralda."
      },
      {
        nombre: "Catedral de Segovia",
        sobrenombre: "La Dama de las Catedrales",
        caracteristicas: "Elegante y esbelta, es una de las últimas catedrales gónicas construidas en España (S. XVI), mostrando rasgos hacia el Renacimiento."
      },
      {
        nombre: "Catedral Nueva de Salamanca",
        sobrenombre: "",
        caracteristicas: "Iniciada en 1513 junto a la Catedral Vieja, mantuvo el estilo gótico por decisión arquitectónica en pleno auge renacentista."
      }
    ]
  },
  {
    id: "ruta-norte-nordeste",
    nombre: "Ruta del Norte - Nordeste",
    descripcion: "Itinerario que recorre joyas del gótico desde Asturias hasta Zaragoza atravesando espectaculares paisajes.",
    googleMapsUrl: "https://www.google.com/maps/dir/Catedral+de+Oviedo/Catedral+de+Pamplona/Catedral+de+Tarazona",
    catedrales: [
      {
        nombre: "Catedral de Oviedo (San Salvador)",
        sobrenombre: "",
        caracteristicas: "Joya gótica con influencia prerrománica asturiana, famosa por su esbelta torre calada y la Cámara Santa."
      },
      {
        nombre: "Catedral de Pamplona",
        sobrenombre: "",
        caracteristicas: "Destaca su claustro gótico del siglo XIV, considerado uno de los más hermosos y refinados de Europa."
      },
      {
        nombre: "Catedral de Tarazona (Santa María de la Huerta)",
        sobrenombre: "",
        caracteristicas: "Fusión singular de planta gótica pura francesa con decoración y cimborrio en ladrillo de estilo mudéjar."
      }
    ]
  }
];

module.exports = rutasGoticas;
