
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToPokemonDetail(pokeDetail) {
    const pokemon = new PokemonDetails()
    pokemon.id = pokeDetail.id
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // const [type] = types

    // pokemon.types = types
    // pokemon.type = type

    // pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.photo = pokeDetail.photo

    console.log(pokemon)
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonSpecies = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
    return fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.genera)
        .then((resp) => console.log(resp))
        .catch((e) => console.error(e))
}