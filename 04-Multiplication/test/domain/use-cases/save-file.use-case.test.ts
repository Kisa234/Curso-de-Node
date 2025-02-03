import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs'


describe('SaveFileUseCase', ()=>{
    
    const customOptions={
        fileContent:'custom content',
        fileDestination:'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }
    
    const filePath =`${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    
    afterEach( ( )=> {
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', {recursive:true});
        
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExists) fs.rmSync(customOptions.fileDestination, {recursive:true});
    });

    test('should save file with default values', ()=>{
        
        const savefile = new SaveFile();
        const options={
            fileContent:'test content'
        }
        
        const filePath ='outputs/table.txt';
        
        const result = savefile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

        expect(result).toBe(true);
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(options.fileContent);
        
        
    });
    
    test('should save file with custom values', ()=>{
        
        const savefile = new SaveFile();
        
        const result = savefile.execute(customOptions);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
        
        expect(result).toBe(true);
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(customOptions.fileContent);

    })

    test('should return false if directory could not be crated',() =>{
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
            () =>{ throw new Error('this is a custom error message form testing'); }
        );

        const reusult  = saveFile.execute(customOptions);
        
        expect(reusult).toBe(false);

        mkdirSpy.mockRestore();
    });


    test('should return false if filed could not be crated',() =>{
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
            () =>{ throw new Error('this is a custom writing error message form testing'); }
        );

        const result  = saveFile.execute({fileContent:'Hola'});
        
        expect(result).toBe(false);

        writeFileSpy.mockRestore;
    });

});