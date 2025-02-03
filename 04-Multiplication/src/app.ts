import { yarg } from "./plugins/yargs.plugin";
import { serverApp } from "./presentation/server-app";

// console.log(process.argv);
// console.log(yarg.b);

(async()=>{
    await main();
})();

async function main() {
    const  { b:base , l: limit , s:showTable , n:name , d:destination} = yarg;
    
    serverApp.run({base, limit, showTable, name,  destination});
}

