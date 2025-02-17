import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import  'dotenv/config';

(async() => {
    await main();
})();


async function main (){
    await MongoDataBase.connect(
        {
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_NAME
        }   
    )

    const prisma = new PrismaClient();
    

    // const newlog = await LogModel.create({
    //     message: 'Hello World',
    //     origin: 'app.ts',
    //     level: 'low',

    // });
    // await newlog.save();
    // console.log(newlog);

    // const logs = await LogModel.find();
    // console.log(logs[0].message);

    Server.start();   
    
}