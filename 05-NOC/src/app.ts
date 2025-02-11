import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";
import  'dotenv/config';

(async() => {
    await main();
})();


function main (){

    Server.start();   
    
}