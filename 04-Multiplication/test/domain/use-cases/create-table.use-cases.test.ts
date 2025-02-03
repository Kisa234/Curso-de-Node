import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';


describe('CreateTableUseCase', ()=>{

    test('Should create table with default values',()=>{
        
        const createTable = new CreateTable();
        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;
        
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 0 = 0');
        expect(table).toContain('2 x 1 = 2');

    });
    
    
    test('Should create table with custom values', ()=>{
        
        const options={
            base:3,
            limit:20
        }
        
        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;
        
        expect(table).toContain('3 x 0 = 0');
        expect(table).toContain('3 x 20 = 6');
        expect(rows).toBe(26);

    })
})

