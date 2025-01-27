// const {emailTemplate} = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// console.log (emailTemplate);
// const{getUserById}=require('./js-foundation/04-arrow');
// const getPokemonById = require('./js-foundation/06-promises');
// const {buildLogger} = require('../plugins/winston.plugin');

// const logger = buildLogger('index');
// logger.log('Hello from index');
// logger.error('Esto es algo malo')




// getPokemonById(4)
//     .then( (pokemon) => console.log({pokemon}) )
//     .catch( (err) =>  console.log('Porfavor intenta de nuevo'))
//     .then( () => console.log('Finalmente'));

// getPokemonById(4, (pokemon) => {
//     console.log({pokemon});
// });

// !REFERENCIA A LA FUNCION FACTORY
// const {getAge, getUUID} = require('../plugins');
// const {buildMakePerson} = require('./js-foundation/05-factory');

// const makePerson = buildMakePerson({getUUID,getAge});
// const obj = { name : 'Renzo', birthdate: '2003-11-22'};

// const renzo = makePerson(obj);

// console.log(renzo); 