'use strict';

var textContrast = (function(dark, light){

    function textContrast(el){
        if(_isArray(el)) return el.forEach(textContrast);

        if(typeof el == 'string'){
            return document.querySelectorAll(el).forEach(textContrast);
        }

        var color = _getBgColor(el);

        el.style['color'] = _getContrastYIQ(color);
    }

    function _getContrastYIQ(color){
        var r, g, b;

        if(typeof color == 'string'){

            var parts;

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
        else if(_isArray(color)){
            r = color[0];
            g = color[1];
            b = color[2];
        }
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? dark : light;
    }

    function _getBgColor(el){
        return window.getComputedStyle(el)['background-color'];
    }

    function _parseRGBComponents(rgbString){
        var rgx = /rgba?\((\d+),\s?(\d+),\s?(\d+)/;

        var match = rgbString.match(rgx);

        if(!match){
            return undefined;
        }

        var r = match[1], g = match[2], b = match[3];

        return [r, g, b];
    }

    function _isArray(thing){

        var type = Object.prototype.toString.call(thing).match(/\[.* (.*)\]/)[1].toLowerCase();

        return (type == 'array' || type == 'htmlcollection' || type == 'nodelist') ? true : false;
    }

    function _isHexOrRGB(str){
        if(/#/.test(str)) return 'hex';
        if(/rgb/.test(str)) return 'rgb';
        return undefined;
    }

    function _hexToRGB(str){
        var hex = str.replace('#', '');

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return [r, g, b];
    }


    return textContrast;

})('#303030', '#FBFBFB');
