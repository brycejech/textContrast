'use strict';

import * as utils from './utils';


describe('utils._isArray should identify an array', () => {
    test('With an array', () => {
        expect(utils._isArray([])).toBe(true);
    });
});

describe('utils._isArray should identify non-arrays', () => {
    test('With an object', () => {
        expect(utils._isArray({})).toBe(false);
    });

    test('With a boolean', () => {
        expect(utils._isArray({})).toBe(false);
    });

    test('With a string', () => {
        expect(utils._isArray('string')).toBe(false);
    });

    test('With a number', () => {
        expect(utils._isArray(4)).toBe(false);
    });

    test('With a function', () => {
        expect(utils._isArray(function(){})).toBe(false);
    });

    test('With a regex', () => {
        expect(utils._isArray(/$.+^/)).toBe(false);
    });

    test('With a date object', () => {
        expect(utils._isArray(new Date())).toBe(false);
    });

    test('With undefined', () => {
        expect(utils._isArray(undefined)).toBe(false);
    });

    test('With null', () => {
        expect(utils._isArray(null)).toBe(false);
    });
});

describe('utils._getContrastYIQ should return a number', () => {
    test('With [255, 255, 255]', () => {
        expect(utils._getContrastYIQ([255, 255, 255])).toBe(255);
    });

    test('With [255, 0, 255]', () => {
        expect(utils._getContrastYIQ([255, 0, 255])).toBeCloseTo(105.315);
    });

    test('With [0, 0, 0]', () => {
        expect(utils._getContrastYIQ([0, 0, 0])).toBe(0);
    });
});

describe('utils._getContrastYIQ should throw on invalid input', () => {
    test('With undefined', () => {
        expect(() => utils._getContrastYIQ(undefined)).toThrow();
    });

    test('With a single invalid array item', () => {
        expect(() => utils._getContrastYIQ([255, null, 255])).toThrow();
    });
});

describe('utils._isNumeric should identify numbers', () => {
    test('With a number', () => {
        expect(utils._isNumeric(255)).toBe(true);
    });

    test('With a negative number', () => {
        expect(utils._isNumeric(-255)).toBe(true);
    });

    test('With a float', () => {
        expect(utils._isNumeric(3.14)).toBe(true);
    });
});

describe('utils._isNumeric should identify non-numbers', () => {
    test('With a string', () => {
        expect(utils._isNumeric('abc')).toBe(false);
    });

    test('With an object', () => {
        expect(utils._isNumeric({})).toBe(false);
    });

    test('With an array', () => {
        expect(utils._isNumeric([])).toBe(false);
    });

    test('With infinity', () => {
        expect(utils._isNumeric(Infinity)).toBe(false);
    });

    test('With negative infinity', () => {
        expect(utils._isNumeric(-Infinity)).toBe(false);
    });
});
