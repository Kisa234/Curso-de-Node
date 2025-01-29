import exp from "constants";
import { getAge } from "../../plugins";

describe("plugins/get-age.plugin", () => {

    test('getAge should return the age of a person', () => {
        const birthdate = '22-11-2003';
        const age = getAge(birthdate);

        expect(typeof age).toBe('number');
    });


    test('getAge should return the correct age', () => {
        const birthdate = '22-11-2003';
        const age = getAge(birthdate);

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(calculatedAge);
    });

   test('getAge shgould return 0 if birthdate is invalid', () => {
        const spy = jest.spyOn(Date.prototype,'getFullYear').mockReturnValue(2003); 
        const birthdate = '2003';
        const age = getAge(birthdate);

        expect(age).toBe(0);
   });
});
