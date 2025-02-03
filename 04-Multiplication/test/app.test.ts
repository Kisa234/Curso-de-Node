import { ServerApp } from '../src/presentation/server-app';

describe('Test App.ts', ()=> {
    
    test('should call AppServer.run with values', async()=>{
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = [
            'node',
            'app.ts',
            '-b','2',
            '-l','10',
            '-s',
            '-d','test-destination',
            '-n','test-filename'
        ];

        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base:2,
            limit:10,
            showTable:true,
            fileDestination:'test-destination',
            fileName:'test-filename'
        });
                

    });

});