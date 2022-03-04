import { getRandomIndex } from './generalHelpers';

describe('getRandomIndex', () => {
    it('returns 0 for an empty array', () => {
        const array = [];
        expect(getRandomIndex(array.length)).toBe(0);
    });

    it('returns an index that is within the array', () => {
        const array = [0, 1, 2, 3, 4, 5];
        expect(getRandomIndex(array.length)).toBeGreaterThanOrEqual(0);
        expect(getRandomIndex(array.length)).toBeLessThan(array.length);
    });
});
