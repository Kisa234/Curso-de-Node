import fs from 'fs'

export interface SaveFileUseCase {
    execute: ( options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination? : string;
    fileName? : string;
} 

export class SaveFile implements SaveFileUseCase{

    constructor(){}


    execute ({  fileContent,
                fileDestination = 'outputs',
                fileName = 'table'
            }: Options): boolean {
        const outputPath = 'outputs';
        
        try{            
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, 'utf-8');
            return true;
        }
        catch(error){
            console.log(error);
            return false;

        }
    }
}