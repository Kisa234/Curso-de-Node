 
 describe ( 'Test in the index file' ,   ( )   =>   {
    
    test ( 'should be 30' ,   ( )   =>   {   

        // arrange
            const num1:number = 10;
            const num2:number = 20;


        // act
            const result:number = num1 + num2;
    
        // assert
            expect( result ).toBe( 30 ) ;

    });

 });