import { emailTemplate } from '../../js-foundation/01-template';

describe("js-foundation/01-template", () => {
    test("emailTemplate should containg a greeting", () => {
        expect(emailTemplate).toContain("Hi");    
    })

    test("emailTemplate should containg a {{name}} and {{orderId}}", () => {
        expect(emailTemplate).toMatch(/{{name}}/);    
        expect(emailTemplate).toMatch(/{{orderId}}/);    
    })
});