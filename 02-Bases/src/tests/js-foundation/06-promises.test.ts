import { getPokemonById } from '../../js-foundation/06-promises';

describe("js-foundation/06-promises", () => {

    test('getpokemonById should return a pokemon', async() => {
        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);

        expect(pokemonName).toBe('bulbasaur');
    });


    test('should return an error if pokemon does not exist', async() => {
        
        try {
            const id = 10000000;
            const pokemonName = await getPokemonById(id);
            expect(true).toBeFalsy();
        }catch(error){
            const id = 10000000;
            expect(error).toBe(`Pokemon not found with id ${id}`);
        }

    });

});