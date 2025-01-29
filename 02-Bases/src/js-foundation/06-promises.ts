import { httpCLient } from "../plugins/http-client.plugin";


export const getPokemonById = async(id:string|number): Promise<string> =>  { 
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`; 
        const pokemon = await httpCLient.get(url);
    
        return pokemon.name;
        
    }catch(error){
        throw `Pokemon not found with id ${id}`;
    }
    
    // throw new Error('No se encontro el pokemon');
    
    // return fetch(url)
    //     .then((response) => response.json())
    //     // .then( () => {throw new Error('No se encontro el pokemon')  } )
    //     .then((pokemon) =>pokemon.name);

    // response.json().then( (pokemon) =>{
    //     callback(pokemon.name);
    // });

}
