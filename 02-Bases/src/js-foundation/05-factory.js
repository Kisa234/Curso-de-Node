const { getId, getAge } = require('../../plugins/index');


const buildPerson = ({name, birthdate}) => {
    
    
    return{
        id: getId(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate),
        
    }
}

const obj = { name : 'Renzo', birthdate: '2003-11-22'};
const john = buildPerson (obj);
console.log(john);