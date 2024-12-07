const typeColors = {
    Grass: "#78C850",
    Poison: "#A040A0",
    Fire: "#F08030",
    Flying: "#A890F0",
    Water: "#6890F0",
    Bug: "#A8B820",
    Normal: "#A8A878",
    Electric: "#F8D030",
    Ground: "#E0C068",
    Fairy: "#EE99AC",
    Fighting: "#C03028",
    Psychic: "#F85888",
    Rock: "#B8A038",
    Steel: "#B8B8D0",
    Ice: "#98D8D8",
    Ghost: "#705898",
    Dragon: "#7038F8"
};

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${pokemon.img}" alt="${pokemon.name}">
        <p class="number">#${pokemon.num}</p>
        <h2 class="name">${pokemon.name}</h2>
        <div class="types">
            ${pokemon.type.map(type => `
                <span class="type" style="background-color: ${typeColors[type]}">${type}</span>
            `).join('')}
        </div>
    `;

    card.addEventListener('click', () => showPokemonDetails(pokemon));
    return card;
}

function showPokemonDetails(pokemon) {
    const modal = document.getElementById('pokemon-modal');
    const detailsContainer = document.getElementById('pokemon-details');

    detailsContainer.innerHTML = `
        <img src="${pokemon.img}" alt="${pokemon.name}" class="detail-image">
        <h2>${pokemon.name}</h2>
        <p class="number">#${pokemon.num}</p>
        <div class="types">
            ${pokemon.type.map(type => `
                <span class="type" style="background-color: ${typeColors[type]}">${type}</span>
            `).join('')}
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Height</div>
                <div>${pokemon.height}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Weight</div>
                <div>${pokemon.weight}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Candy</div>
                <div>${pokemon.candy}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Candy Count</div>
                <div>${pokemon.candy_count}</div>
            </div>
        </div>
        <div class="weaknesses">
            <h3>Weaknesses</h3>
            <div class="types">
                ${pokemon.weaknesses.map(weakness => `
                    <span class="type" style="background-color: ${typeColors[weakness]}">${weakness}</span>
                `).join('')}
            </div>
        </div>
        ${pokemon.next_evolution ? `
            <div class="evolution-chain">
                <h3>Evolution Chain</h3>
                <div class="evolution-path">
                    ${pokemon.name}
                    ${pokemon.next_evolution.map(evolution => `
                        <span class="evolution-arrow">→</span>
                        ${evolution.name}
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;

    modal.style.display = 'flex';
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('pokemon-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemon-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPokemon = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.num.includes(searchTerm)
    );
    renderPokemonCards(filteredPokemon);
});

function renderPokemonCards(pokemonList) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    pokemonList.forEach(pokemon => {
        container.appendChild(createPokemonCard(pokemon));
    });
}
renderPokemonCards(pokemons);