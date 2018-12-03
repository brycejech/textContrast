# Library for Fixing Issues with Text Contrast

## textContrast.fix(el[, light[, dark]])

This method will check the background-color of each element found and set it's color to light or dark as appropriate. `el` parameter can be an element, array of elements, selector, or array of selectors. Does not look at background-color of parent elements.

## textContrast.isLight(color)

Returns `true` if `color` is considered light, `false` otherwise. Color format can be hex, rgb, or rgba (note that rgba alpha channels are not considered in determining lightness). Throws error if `color` cannot be parsed and converted to an RGB value.

## textContrast.isDark(color)

Returns `true` if `color` is considered dark, `false` otherwise. Color format can be hex, rgb, or rgba (note that rgba alpha channels are not considered in determining lightness). Throws error if supplied color cannot be parsed and converted to an RGB value.

## textContrast.isLightOrDark(color)

Returns `'light'` if color is considered light, `'dark'` if the color is dark, undefined otherwise.
