'use strict';

import { textContrast } from './text-contrast';

const tc = textContrast;

const lightColors = [
    '#ffffff',
    '#fff',
    'ffffff',
    'fff',
    'rgb(255,255,255)',
    'rgba(255,255,255,1)'
];

const darkColors = [
    '#000000',
    '#000',
    '000000',
    '000',
    'rgb(0,0,0)',
    'rgba(0,0,0,1)'
];

describe('textContrast.isDark: properly identify dark colors', () => {
    darkColors.forEach(color => {
        test(`"${ color }" should be dark`, () => {
            expect(tc.isDark(color)).toBe(true);
        });
    });
});

describe('textContrast.isDark: properly identify light colors', () => {
    lightColors.forEach(color => {
        test(`"${ color }" should not be dark`, () => {
            expect(tc.isDark(color)).toBe(false);
        });
    });
});

describe('textContrast.isLight: properly identify dark colors', () => {
    darkColors.forEach(color => {
        test(`"${ color }" should not be light`, () => {
            expect(tc.isLight(color)).toBe(false);
        });
    });
});

describe('textContrast.isLight: properly identify light colors', () => {
    lightColors.forEach(color => {
        test(`"${ color }" should be light`, () => {
            expect(tc.isLight(color)).toBe(true);
        });
    });
});

describe('textContrast.isLightOrDark: properly identify dark colors', () => {
    darkColors.forEach(color => {
        test(`"${ color }" should be 'dark'`, () => {
            expect(tc.isLightOrDark(color)).toBe('dark');
        });
    });
});

describe('textContrast.isLightOrDark: properly identify light colors', () => {
    lightColors.forEach(color => {
        test(`"${ color }" should be 'light'`, () => {
            expect(tc.isLightOrDark(color)).toBe('light');
        });
    });
});
