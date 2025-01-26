
// const {getAge, getUUID} = require('../../plugins');

const buildMakePerson = ({getUUID , getAge}) => {


    return ({name, birthdate}) => {
    
    
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

module.exports = {
    buildMakePerson,
};