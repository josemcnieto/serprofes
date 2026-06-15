const input = document.getElementById("poke-input");
const btn = document.getElementById("btn-buscar");
const out = document.getElementById("resultado");

btn.addEventListener("click", async() =>{
    //limpiamos el texto y lo pasamos a minusculas(la API falla si le envias mayusculas)
    const termino = input.value.trim().toLowerCase();
    if (termino === ""){
        out.textContent = " ⚠ Por favor, escribe un nombre o ID.";
        return;
    }
    out.textContent = "⌛ Cargando datos desde la PokeAPI....";

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termino}`);

        if(!respuesta.ok) throw new Error("Pokemon no encontrado");

        const pokemon = await respuesta.json();

        //la fabrica (Map): Entra un array de objetos raros, salen etiquetas <li> limpias
        //join("") quita las comas que map() pone por defecto entre los elementos
        const estadisticasHTML = pokemon.stats.map(stat => {
            return`<li><strong>${stat.stat.name.toUpperCase()}:</strong>
                ${stat.base_stat}</li>
            `;
        }).join("");
        const tipos = pokemon.types.map(t => t.type.name).join(", ");
        out.innerHTML = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="150" />
    <p><strong>Tipos:</strong> ${tipos}</p>
    <ul>
        ${estadisticasHTML}
    </ul>
`;
    }catch (error){
        out.textContent = "❌ Error : No existe ningun Pokemon con ese nombre"
    }


    // añado para el sonido

    const btnSonido = document.getElementById("btn-sonido");

// crea el audio
const sonido = new Audio("sonido.mp3");

btnSonido.addEventListener("click", () => {
    sonido.play();
});
});