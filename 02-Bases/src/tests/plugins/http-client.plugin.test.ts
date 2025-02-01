import { error } from 'console';
import { httpCLient } from '../../plugins/http-client.plugin';

describe('http-client.plugin', () => {

    test('httpClient.get() should return data', async() => {
        const data = await httpCLient.get('https://jsonplaceholder.typicode.com/todos/1');
        expect(data).toEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
        });
    });


    test('httpClient.post() should have POST, PUT and Delete methods', () => {
        expect (typeof httpCLient.get).toBe('function');
        expect (typeof httpCLient.post).toBe('function');
        expect (typeof httpCLient.put).toBe('function');
        expect (typeof httpCLient.delete).toBe('function');
    });

});
