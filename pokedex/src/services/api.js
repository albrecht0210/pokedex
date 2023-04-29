import axios from 'axios';

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = (offset) => {
    return axios.get(`${API_BASE_URL}/pokemon-species?limit=5&offset=${offset}`);
}

export const getPokemonDetails = (pokemonID) => {
    const pokemonUrl = `${API_BASE_URL}/pokemon/${pokemonID}`;
    const speciesUrl = `${API_BASE_URL}/pokemon-species/${pokemonID}`;

    return Promise.all([axios.get(pokemonUrl), axios.get(speciesUrl)])
        .then(async (responses) => {
            const evolres = await axios.get(responses[1].data.evolution_chain.url);
            const finalres = responses.map(response => response.data);
            finalres.push(evolres.data);
            return finalres;
        })
        .then(data => {
            const pokemon = {};
            pokemon['id'] =data[0].id;
            pokemon['name'] = data[1].name;
            pokemon['abilities'] = data[0].abilities;
            pokemon['stats'] = data[0].stats;
            pokemon['types'] = data[0].types;

            const desc = data[1].flavor_text_entries.filter(item => item.language.name === "en");
            pokemon['description'] = desc.length !== 0 ? desc[0].flavor_text : 'N/A';
            pokemon['sprite'] = data[0].sprites.other['official-artwork'].front_default;
            pokemon['height'] = data[0].height;
            pokemon['weight'] = data[0].weight;
            pokemon['varieties'] = data[1].varieties;
            pokemon['evolution_chain'] = data[2].chain;

            return pokemon;
        });
}
