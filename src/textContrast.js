'use strict';

const textContrast = (function() {

    function fix(el, light='white', dark='black'){

        // Spread in case working with NodeList, etc on IE
        if(_isArrayLike(el)) return [...el].forEach(item => fix(item, light, dark));

        if(typeof el == 'string'){
            return [...document.querySelectorAll(el)].forEach(item => fix(item, light, dark));
        }

        return _fixContrast(el, light, dark);
    }

    function isLight(color){
        const rgbArray = _toRGBArray(color);

        const yiq = _getContrastYIQ(rgbArray);

        return (yiq >= 128) ? true : false;
    }

    function isDark(color){ return !isLight(color) }

    function isLightOrDark(color){ return isLight(color) ? 'light' : 'dark' }

    function _fixContrast(el, light, dark){

        const color = _getBgColor(el);

        el.style['color'] = isLight(color) ? dark : light;
    }

    function _isArray(o) { return /\[object Array\]/.test(Object.prototype.toString.call(o)) }

    function _isArrayLike(o){

        const type = Object.prototype.toString.call(o)
                        .match(/\[.* (.*)\]/)[1]
                        .toLowerCase();

        return (type == 'array' || type == 'htmlcollection' || type == 'nodelist') ? true : false;
    }

    // See https://24ways.org/2010/calculating-color-contrast for more info
    function _getContrastYIQ(color){
        if(!_isArrayLike(color)){ throw new Error('RGB array not valid') }

        const [r, g, b] = color;

        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        return yiq;
    }

    function _toRGBArray(color){
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

        // Cannot simply test for truthiness as "0" is acceptable
        [r,g,b].forEach(n => {
            if(!(/^[0-9]{1,3}$/.test(n))) throw new Error('Error converting color to RGB array');
        });

        return [r,g,b];
    }

    function _getBgColor(el){
        return window.getComputedStyle(el)['background-color'];
    }

    function _parseRGBComponents(rgbString){
        const rgx = /rgba?\((\d+),\s?(\d+),\s?(\d+)/;

        const match = rgbString.match(rgx);

        if(!match){
            return undefined;
        }

        const r = match[1], g = match[2], b = match[3];

        return [r, g, b];
    }

    function _isHexOrRGB(str){
        str = str.toUpperCase();

        if(/#/.test(str))   return 'hex';
        if(/RGB/.test(str)) return 'rgb';

        // Hex colors without leading octothorpe
        if(/[0-9A-F]{6}|[0-9A-F]{3}/.test(str)) return 'hex';

        return undefined;
    }

    function _hexToRGB(str){
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

    function _getElement(el){
        return el instanceof HTMLElement ? el : document.querySelector(el);
    }

    // Public API
    return {
        fix,
        isLight,
        isDark,
        isLightOrDark
    }

}());
