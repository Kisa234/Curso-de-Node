import { getUserById } from './../../js-foundation/04-arrow';

describe ("js-foundation/04-arrow", () => {

    test("getUserById should return an error if user does not exist", (done) => {
        const id=10;
        getUserById(id, (err, user) => {
            expect(err).toBe(`USUARIO no encontrado ${id}`);
            expect(user).toBeUndefined();
        });
        done();
    });

    test("getUserById should return an user", (done) => {   

        const id = 1;
        getUserById(id, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toStrictEqual({
                id:1,
                name: 'Jhon Doe'
            });
        });
        done();
    });

});