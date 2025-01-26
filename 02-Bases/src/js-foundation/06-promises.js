const {http} = require('../../plugins');

const getPokemonById = async(id) =>  { 
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; 
    const pokemon = await http.get(url);

    // throw new Error('No se encontro el pokemon');
    
    return pokemon.name;



    // return fetch(url)
    //     .then((response) => response.json())
    //     // .then( () => {throw new Error('No se encontro el pokemon')  } )
    //     .then((pokemon) =>pokemon.name);

    // response.json().then( (pokemon) =>{
    //     callback(pokemon.name);
    // });

}

module.exports = getPokemonById