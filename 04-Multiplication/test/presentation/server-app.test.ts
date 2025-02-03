import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import  {ServerApp}  from '../../src/presentation/server-app';

describe('Server-App',()=>{
    
    const options = {
        base: 2,
        limit:10,
        showTable:false,
        fileDestination:'test-destination',
        fileName:'test-filename',
    }

    beforeEach( ()=>{
        jest.clearAllMocks;
    })
    
    test('should create Server App instance', ()=>{

        const serverApp = new ServerApp();
        expect (serverApp).toBeInstanceOf(ServerApp);
        expect (typeof ServerApp.run ).toBe('function');

    });


    test('should run ServerApp with options', ()=>{
        
        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')
        
        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base:options.base,
            limit:options.limit
        });
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent:expect.any(String),
            fileDestination:options.fileDestination,
            fileName:options.fileName
        });
        


    });


    test('should run with custom values mocked',()=>{

        const logMock = jest.fn();
        const logErrorMock =  jest.fn();
        const createTableMock = jest.fn().mockReturnValue('return string');
        const SaveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;

        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = SaveFileMock;
        
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith("Server running...");
        expect(createTableMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(SaveFileMock).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith("File created!");
        expect(logErrorMock).not.toHaveBeenCalledWith("File not created!");



    });

});