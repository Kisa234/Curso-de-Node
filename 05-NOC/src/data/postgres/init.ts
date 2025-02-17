
import { PrismaClient } from "@prisma/client";

export class prisma {
    
    static async connect(){
        
        try{
            const prisma = new PrismaClient();
            console.log('Prisma connected');

        } catch(error){
            console.error('Prisma connection error');
            throw error;
        }
    }


}