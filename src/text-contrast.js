'use strict';

import { _isArrayLike, _fixContrast, _toRGBArray, _getContrastYIQ } from './utils';
// import * as utils from './utils';

const textContrast = (function() {

    // Recursively consume el
    // Can be an element, array of elements, selector or array of selectors
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

        if(!rgbArray) return;

        const yiq = _getContrastYIQ(rgbArray);

        return (yiq >= 128) ? true : false;
    }

    function isDark(color){
        const light = isLight(color);

        // if light is undefined, failed to make sense of 'color'
        return light === undefined ? undefined : !light;
    }

    function isLightOrDark(color){ return isLight(color) ? 'light' : 'dark' }

    // Public API
    const publicAPI = {
        fix,
        isLight,
        isDark,
        isLightOrDark
    }

    return publicAPI;

}());

export { textContrast };
