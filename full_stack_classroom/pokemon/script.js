const container = document.getElementById("pokemon-container");
const searchInput = document.getElementById("search");
let allPokemon = [];

async function loadPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await response.json();

    for (let pokemon of data.results) {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        allPokemon.push({
            name: pokemon.name,
            image: details.sprites.front_default
        });
    }

    displayPokemon(allPokemon);
}

function displayPokemon(list) {
    container.innerHTML = "";
    
    list.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${pokemon.image}" alt="Pokemon Image">
            <h3>${pokemon.name.toUpperCase()}</h3>
        `;

        container.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allPokemon.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    displayPokemon(filtered);
});

loadPokemon();
