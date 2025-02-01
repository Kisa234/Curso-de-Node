"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMakePerson = void 0;
const buildMakePerson = ({ getUUID, getAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        };
    };
};
exports.buildMakePerson = buildMakePerson;
// const obj = { name : 'Renzo', birthdate: '2003-11-22'};
// const john = buildPerson (obj);
// console.log(john);
// module.exports = {
//     buildMakePerson,
// };
