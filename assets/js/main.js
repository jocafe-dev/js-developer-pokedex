const pokemonsAsLi = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let pokemonList = []
const maxRecords = 151
const limit = 10
let offset = 0
const listPageId = 'poke-list-id'
const detailsPageId = 'poke-details-id'
const pokemonTypes = ['normal', 'grass', 'fire', 'water', 'electric', 'ice', 'ground', 'flying', 'poison', 'fighting', 'psychic', 'dark', 'rock', 'bug', 'ghost', 'steel', 'dragon', 'fairy'];
let pickedPokemonId = 0

showAndHideElement(listPageId, detailsPageId)

function showAndHideElement(idToShow, idToHide) {
    const currentPage = document.getElementById(idToShow)
    const otherPage = document.getElementById(idToHide)


    currentPage.style.removeProperty('display')
    otherPage.style.display = 'none'
}

function convertPokemonToLi(pokemon) {
    return `
    <a class="details-link" onclick="goToDetails(${pokemon.id})">
        <li class="pokemon ${pokemon.type}">
            <span class="number">${formatedPokemonId(pokemon.number)}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    </a>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.push(...pokemons)
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonsAsLi.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const goToDetails = (pokemonId) => {
    const pokemon = pokemonList.find(pk => pk.id === pokemonId)
    showAndHideElement(detailsPageId, listPageId)

    convertPokemonToDetails(pokemon)
}

const goToList = () => showAndHideElement(listPageId, detailsPageId)

function convertPokemonToDetails(pokemon) {

    pokeApi.getPokemonSpecies(pokemon).then((resp = []) => {})

    const detailsPage = document.getElementById(detailsPageId)
    const pokemonNameElement = document.getElementById('pokemon-name')

    pokemonNameElement.innerText = pokemon.name

    const pokemonIdElement = document.getElementById('pokemon-id')
    pokemonIdElement.innerText = formatedPokemonId(pokemon.id)

    const pokemonImg = document.getElementById('pokemon-img')
    pokemonImg.src = pokemon.photo

    const ulAttrElement = document.getElementById('ul-attributies')
    ulAttrElement.innerHTML = getAttributesData(pokemon)

    getIlTypes(pokemon)

    convertPokeApiDetailToPokemonDetail(pokemon)

    pokemonTypeClass(detailsPage, pokemon)
}

function pokemonTypeClass(detailsPage, pokemon) {
    const classList = detailsPage.classList.toString().split(' ');
    const pokemonType = classList.find(x => pokemonTypes.includes(x))

    if (pokemonType)
        detailsPage.classList.remove(classList.find(x => x === pokemonType))

    detailsPage.classList.add(pokemon.type)
}

const getIlTypes = (pokemon) => {
    const olElement = document.getElementById('ol-types')
    olElement.innerHTML = '';
    pokemon.types.forEach(type => olElement.innerHTML += `<li class="type ${type}"> ${type} </li>`);
}

const formatedPokemonId = (pokemonId) => {
    if (!pokemonId)
        return

    const idAsNumber = Number(pokemonId)

    if (idAsNumber > 0 && idAsNumber < 10)
        return `#00${idAsNumber}`
    else if (idAsNumber < 100)
        return `#0${idAsNumber}`
    else if (idAsNumber > 100)
        return '#' + idAsNumber.toString()
    else
        return
}

const changeTab = (elementRef, tabCardId) => {
    const oldTabLink = document.getElementsByClassName('active')
    if (oldTabLink.length > 0)
        oldTabLink.item(0).classList.remove('active')

    const newTabLink = document.getElementById(elementRef.target.id)
    newTabLink.classList.add('active')

    const oldTabCard = [...document.getElementsByClassName('tab')].find(x => ![...x.classList].includes('hidden'))
    oldTabCard.classList.add('hidden')

    const newTabCard = document.getElementById(tabCardId)
    newTabCard.classList.remove('hidden')
}

const getAttributesData = (pokemon) => {
    return `
        <li class="attribute item">
            <label id="species" for="species">Species</label>
            <p>${pokemon.species}</p>
        </li>
        <li class="attribute item">
            <label id="height" for="height">Height</label>
            <p>${pokemon.height}</p>
        </li>
        <li class="attribute item">
            <label id="weight" for="weight">Weight</label>
            <p>${pokemon.weight}</p>
        </li>
        <li class="attribute item">
            <label id="abilities" for="abilities">Abilities</label>
            <p>${pokemon.abilities}</p>
        </li>
    `
}