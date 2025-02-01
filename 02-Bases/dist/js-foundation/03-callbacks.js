"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
;
const users = [
    {
        id: 1,
        name: 'Jhon Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
];
const getUserById = (id, callback) => {
    const user = users.find((users) => {
        return users.id === id;
    });
    if (!users) {
        return callback(`USUARIO no encontrado ${id}`);
    }
    return callback(undefined, user);
};
exports.getUserById = getUserById;
