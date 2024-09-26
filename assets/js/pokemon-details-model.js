class PokemonDetails extends Pokemon {
    species
    height
    weight
    abilities
    breeding = {
        // gender: '',
        // eggGroups: '',
        // eggCycle: ''
    }

    // constructor(pokemonId) {
    //     pokeApi.getPokemonDetail()
        
    // }

    percentageFormat(valueToFormat) {
        let percentageAsNumber = 0;

        if(typeof(valueToFormat) === String)
            percentageAsNumber = Number(valueToFormat)
        else if (typeof(valueToFormat) === Number)
            percentageAsNumber = valueToFormat
        else if (typeof(valueToFormat) === null || typeof(valueToFormat) === undefined)
            return

        return (percentageAsNumber.toFixed(1) * 100).toString() + '%'
    }
}