import {characters} from '../../js-foundation/02-destructuring';

describe("js-foundation/02-destructuring", () => {
    test("characters should contain flash and superman", () => {
        expect(characters).toContain("flash");
        expect(characters).toContain("superman");
    })


    test("first character should be flash and second superman", () => {
        const [first, second] = characters;
        expect(first).toBe("flash");
        expect(second).toBe("superman");
    });
});

