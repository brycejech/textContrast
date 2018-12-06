'use strict';

import * as utils from './utils';


describe('utils._isArray should identify an array', () => {
    test('With an array', () => {
        expect(utils._isArray([])).toBeTruthy();
    });
});

describe('utils._isArray should identify non-arrays', () => {
    test('With an object', () => {
        expect(utils._isArray({})).toBeFalsy();
    });

    test('With a boolean', () => {
        expect(utils._isArray({})).toBeFalsy();
    });

    test('With a string', () => {
        expect(utils._isArray('string')).toBeFalsy();
    });

    test('With a number', () => {
        expect(utils._isArray(4)).toBeFalsy();
    });

    test('With a function', () => {
        expect(utils._isArray(function(){})).toBeFalsy();
    });

    test('With a regex', () => {
        expect(utils._isArray(/$.+^/)).toBeFalsy();
    });

    test('With a date object', () => {
        expect(utils._isArray(new Date())).toBeFalsy();
    });

    test('With undefined', () => {
        expect(utils._isArray(undefined)).toBeFalsy();
    });

    test('With null', () => {
        expect(utils._isArray(null)).toBeFalsy();
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
        expect(utils._isNumeric(255)).toBeTruthy();
    });

    test('With a negative number', () => {
        expect(utils._isNumeric(-255)).toBeTruthy();
    });

    test('With a float', () => {
        expect(utils._isNumeric(3.14)).toBeTruthy();
    });
});

describe('utils._isNumeric should identify non-numbers', () => {
    test('With a string', () => {
        expect(utils._isNumeric('abc')).toBeFalsy();
    });

    test('With an object', () => {
        expect(utils._isNumeric({})).toBeFalsy();
    });

    test('With an array', () => {
        expect(utils._isNumeric([])).toBeFalsy();
    });

    test('With infinity', () => {
        expect(utils._isNumeric(Infinity)).toBeFalsy();
    });

    test('With negative infinity', () => {
        expect(utils._isNumeric(-Infinity)).toBeFalsy();
    });
});

describe('utils._toRGBArray should parse hex colors', () => {
    test('#000 should be [0, 0, 0]', () => {
        expect(utils._toRGBArray('#000')).toEqual([0, 0, 0]);
    });

    test('#FFF should be [255, 255, 255]', () => {
        expect(utils._toRGBArray('#FFF')).toEqual([255, 255, 255]);
    });

    test('#F3F3F3 should be [243, 243, 243]', () => {
        expect(utils._toRGBArray('#F3F3F3')).toEqual([243, 243, 243]);
    });

    test('#232323 should be [35, 35, 35]', () => {
        expect(utils._toRGBArray('#232323')).toEqual([35, 35, 35]);
    });

    test('000 should be [0, 0, 0]', () => {
        expect(utils._toRGBArray('000')).toEqual([0, 0, 0]);
    });

    test('fff should be [255, 255, 255]', () => {
        expect(utils._toRGBArray('fff')).toEqual([255, 255, 255]);
    });
});

describe('utils._toRGBArray should parse rgb(a) colors', () => {
    test('rgb(222, 222, 222) should be [222, 222, 222]', () => {
        expect(utils._parseRGBComponents('rgb(222, 222, 222)')).toEqual([222, 222, 222]);
    });

    test('rgba(123, 123, 123, 1) should be [123, 123, 123]', () => {
        expect(utils._parseRGBComponents('rgba(123, 123, 123, 1)')).toEqual([123, 123, 123]);
    });

    test('rgba(23, 5, 124, 1) should be [23, 5, 124]', () => {
        expect(utils._parseRGBComponents('rgba(23, 5, 124, 1)')).toEqual([23, 5, 124]);
    });
});

describe('utils._toRGBArray should throw error on invalid inputs', () => {
    test('With undefined', () => {
        expect(() => utils._toRGBArray(undefined)).toThrow();
    });

    test('With empty array', () => {
        expect(() => utils._toRGBArray([])).toThrow();
    });

    test('With an invalid array', () => {
        expect(() => utils._toRGBArray(['spam', 'eggs', 'ham'])).toThrow();
    })

    test('With an object', () => {
        expect(() => utils._toRGBArray({})).toThrow();
    });

    test('With a number', () => {
        expect(() => utils._toRGBArray(42)).toThrow();
    });

    test('With an invalid string', () => {
        expect(() => utils._toRGBArray('string')).toThrow();
    });
});

describe('utils._isHexOrRGB should identify hex colors', () => {
    test('"#fff" should be "hex"', () => {
        expect(utils._isHexOrRGB('#fff')).toBe('hex');
    });

    test('"#000000" should be "hex"', () => {
        expect(utils._isHexOrRGB('#000000')).toBe('hex');
    });

    test('"efe" should be "hex"', () => {
        expect(utils._isHexOrRGB('efe')).toBe('hex');
    });

    test('"2f2f2f" should be "hex"', () => {
        expect(utils._isHexOrRGB('2f2f2f')).toBe('hex');
    });
});

describe('utils._isHexOrRGB should identify rgb(a) colors', () => {
    test('"rgb(0,0,0)" should be "rgb"', () => {
        expect(utils._isHexOrRGB('rgb(0,0,0)')).toBe('rgb');
    });

    test('"rgba(23, 45, 128, 1)" should be "rgb"', () => {
        expect(utils._isHexOrRGB('rgba(23, 45, 128, 1)')).toBe('rgb');
    });

    test('"rgb( 83 , 0,167 )" should be "rgb"', () => {
        expect(utils._isHexOrRGB('rgb( 83 , 0,167 )')).toBe('rgb');
    });

    test('"rgba(97,0,16 )" should be "rgb"', () => {
        expect(utils._isHexOrRGB('rgba(97,0,16 )')).toBe('rgb');
    });
});

describe('utils._isHexOrRGB should return undefined', () => {
    test('With an object', () => {
        expect(utils._isHexOrRGB({})).toBeUndefined();
    });

    test('With a boolean', () => {
        expect(utils._isHexOrRGB({})).toBeUndefined();
    });

    test('With a string', () => {
        expect(utils._isHexOrRGB('string')).toBeUndefined();
    });

    test('With a number', () => {
        expect(utils._isHexOrRGB(4)).toBeUndefined();
    });

    test('With a function', () => {
        expect(utils._isHexOrRGB(function(){})).toBeUndefined();
    });

    test('With a regex', () => {
        expect(utils._isHexOrRGB(/$.+^/)).toBeUndefined();
    });

    test('With a date object', () => {
        expect(utils._isHexOrRGB(new Date())).toBeUndefined();
    });

    test('With undefined', () => {
        expect(utils._isHexOrRGB(undefined)).toBeUndefined();
    });

    test('With null', () => {
        expect(utils._isHexOrRGB(null)).toBeUndefined();
    });
});

describe('_hexToRGB should convert hex to rgb array', () => {
    test('"#ffffff" should be [255, 255, 255]', () => {
        expect(utils._hexToRGB('#ffffff')).toEqual([255, 255, 255]);
    });

    test('"#fff" should be [255, 255, 255]', () => {
        expect(utils._hexToRGB('#fff')).toEqual([255, 255, 255]);
    });

    test('"efe" should be [238, 255, 238]', () => {
        expect(utils._hexToRGB('efe')).toEqual([238, 255, 238]);
    });

    test('"000000" should be [0, 0, 0]', () => {
        expect(utils._hexToRGB('000000')).toEqual([0, 0, 0]);
    });
});

describe('_hexToRGB should throw on invalid hex codes', () => {
    test('With an object', () => {
        expect(() => utils._hexToRGB({})).toThrow();
    });

    test('With a boolean', () => {
        expect(() => utils._hexToRGB({})).toThrow();
    });

    test('With a string', () => {
        expect(() => utils._hexToRGB('string')).toThrow();
    });

    test('With a number', () => {
        expect(() => utils._hexToRGB(4)).toThrow();
    });

    test('With a function', () => {
        expect(() => utils._hexToRGB(function(){})).toThrow();
    });

    test('With a regex', () => {
        expect(() => utils._hexToRGB(/$.+^/)).toThrow();
    });

    test('With a date object', () => {
        expect(() => utils._hexToRGB(new Date())).toThrow();
    });

    test('With undefined', () => {
        expect(() => utils._hexToRGB(undefined)).toThrow();
    });

    test('With null', () => {
        expect(() => utils._hexToRGB(null)).toThrow();
    });
});
