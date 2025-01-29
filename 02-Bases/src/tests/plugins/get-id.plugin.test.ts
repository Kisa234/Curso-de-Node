import { getUUID } from "../../plugins/get-id.plugin";

describe("plugins/get-id.plugin", () => {

    test('getUUID should return a string', () => {
        const uuid = getUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    });

});
