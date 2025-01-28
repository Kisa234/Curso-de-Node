import { buildMakePerson } from '../../js-foundation/05-factory';
import { getAge } from '../../plugins/get-age.plugin';
import { getUUID } from '../../plugins/get-id.plugin';

describe("js-foundation/05-factory", () => {
       
    const getAge = () => 35;
    const getUUID = () =>'1234';
    
    test('buildMakePerson should return a function', () => {

        const makePerson = buildMakePerson({getAge, getUUID});
        expect(typeof makePerson).toBe('function'); 

    });

    test('buildMakePerson should return a person', () => {
        const makePerson = buildMakePerson({getAge, getUUID});
        const renzo = makePerson({ name:'Renzo', birthdate:'22-11-2003' });

        expect(renzo).toEqual({
            id: '1234',
            name: 'Renzo',
            birthdate: '22-11-2003',
            age: 35
        });
    });
});