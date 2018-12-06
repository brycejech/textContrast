'use strict';

export function _fixContrast(el, light, dark){
    // TODO: Add support for checking parent elements if bg is fully transparent

    const color = _getBgColor(el);

    el.style['color'] = isLight(color) ? dark : light;
}

// Array.isArray can be used?
export function _isArray(o) { return /\[object Array\]/.test(Object.prototype.toString.call(o)) }

export function _isArrayLike(o){

    const type = Object.prototype.toString.call(o)
                    .match(/\[.* (.*)\]/)[1]
                    .toLowerCase();

    return (type == 'array' || type == 'htmlcollection' || type == 'nodelist') ? true : false;
}

// See https://24ways.org/2010/calculating-color-contrast for more info
export function _getContrastYIQ(color){
    if(!_isArrayLike(color)){ throw new Error('RGB array not valid') }

    color.forEach(component => {
        if(!_isNumeric(component)){
            throw new Error(`RGB component ${ component } not valid`);
        }
    });

    const [r, g, b] = color;

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return yiq;
}

export function _isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function _toRGBArray(color){
    let r, g, b;

    if(typeof color === 'string'){
        let parts;

        switch(_isHexOrRGB(color)){
            case 'hex':
                parts = _hexToRGB(color);
                break;
            case 'rgb':
                parts = _parseRGBComponents(color);
                break;
            default:
                throw new Error(`Unknown color type - ${ color }`);
                return;
        }
        r = parts[0];
        g = parts[1];
        b = parts[2];
    }
    else if(_isArrayLike(color)){
        r = color[0];
        g = color[1];
        b = color[2];
    }
    else{
        throw new Error(`Unknown color type - ${ color }`);
    }

    // Cannot simply test for truthiness as "0" is acceptable
    [r,g,b].forEach(n => {
        if(!(/^[0-9]{1,3}$/.test(n))) throw new Error('Error converting color to RGB array');
    });

    return [r,g,b];
}

export function _getBgColor(el){
    return window.getComputedStyle(el)['background-color'];
}

export function _parseRGBComponents(rgbString){
    const rgx = /rgba?\((\d+),\s?(\d+),\s?(\d+)/;

    const match = rgbString.match(rgx);

    if(!match){
        return undefined;
    }

    const [_, r, g, b] = match;

    // Use wrapper fn here b/c parseInt also accepts a radix arg
    // and map will pass a second index arg resulting in invalid radix
    return [r, g, b].map(num => parseInt(num));
}

export function _isHexOrRGB(str){
    if(!str) return;

    str = str.toString().trim().toUpperCase();

    if(/^#?([0-9a-fA-F]{3}){1,2}$/.test(str)) return 'hex';
    if(/RGB/.test(str)) return 'rgb';

    // Incorrectly matches #0000 or #00000
    // /^#?([0-9a-fA-F]{3}){1,2}$/

    return undefined;
}

export function _hexToRGB(str){
    if(typeof str !== 'string'){ throw new Error('Invalid hex code') }
    
    let hex = str.replace('#', '').toUpperCase();

    if(!(hex.length % 3 === 0)){ throw new Error('Invalid hex code') }

    // Convert 3 digit hex to 6
    if(hex.length === 3){
        hex = hex.replace(/(.)(.)(.)/, '$1$1$2$2$3$3');
    }

    if(!(/[0-9A-F]{6}/.test(hex))) throw new Error('Invalid hex code');

    const r = parseInt(hex.substr(0, 2), 16),
          g = parseInt(hex.substr(2, 2), 16),
          b = parseInt(hex.substr(4, 2), 16);

    return [r, g, b];
}

export function _getElement(el){
    return el instanceof HTMLElement ? el : document.querySelector(el);
}
