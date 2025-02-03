
const runCommand = async(args: string[])=>{
    
    process.argv = [...process.argv, ...args];
    
    const {yarg} = await import('../../src/plugins/yargs.plugin');
    
    return yarg;
}


describe('Test yarg.plugin.ts', ()=>{

    const originalArgv = process.argv;

    beforeEach(()=>{
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async()=>{

        const argv = await runCommand(['-b','5']);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'Multiplication-Table',
            d: 'outputs',
        }));

    });
    
    test('Should return configuration with custom values', async()=>{

        const argv = await runCommand(['-b' , '10' , '-l' , "20" , "-s" , "-n" , "custom-name" , "-d" , "custom-dir"]);
        expect(argv).toEqual(expect.objectContaining({
            b: 10,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }));

    });
    

});