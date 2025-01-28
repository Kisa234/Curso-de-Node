
// const {getAge, getUUID} = require('../../plugins');
interface buildMakePersonOptions {
    getUUID: () => string;
    getAge: (birthdate: string) => number;
}

interface Person {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({getUUID, getAge}: buildMakePersonOptions) => {


    return ({name, birthdate}:Person) => {
    
    
        return{
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
            
        }
    }
}



// const obj = { name : 'Renzo', birthdate: '2003-11-22'};
// const john = buildPerson (obj);
// console.log(john);

// module.exports = {
//     buildMakePerson,
// };