export interface CreateTableUseCase{
    execute: (options: CreateTableOptions )=>string;

}

export interface CreateTableOptions {
    base:number;
    limit?: number;    
}


export class CreateTable{

    constructor(
        /**
         *  DI - Dependency Injection
         */
    ){}

execute({ base, limit = 10 }: CreateTableOptions) {

const header = `
=================================
        TABLA DEL ${base}         
=================================\n`;


        let outputMessage = '';
        for (let i = 0; i <= limit; i++) {
        outputMessage += `${base} x ${i} = ${base * i}\n`;
        
    }

        outputMessage = header + outputMessage;

        return outputMessage;
    }
}