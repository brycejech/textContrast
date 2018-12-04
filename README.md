# Text Contrast

Automatically adjust text color based on background color to improve readability. Also provides methods for determining if an rgb, rgba, or hex color code is light or dark.

## Basic Example

```html
<style>
    .bg {
        display: inline-block;
        float:   left;
        padding: 25px;
        border:  1px solid black;
        color:   black;
    }

    .bg-green  { background-color: green;  }
    .bg-yellow { background-color: yellow; }
    .bg-purple { background-color: purple; }
    .bg-red    { background-color: red;    }
    .bg-orange { background-color: orange; }
    .bg-black  { background-color: black;  }
    .bg-white  { background-color: white;  }
</style>

<script src="/js/text-contrast.min.js"></script>

<div class="bg bg-green">Some Text</div>
<div class="bg bg-yellow">Some Text</div>
<div class="bg bg-purple">Some Text</div>
<div class="bg bg-red">Some Text</div>
<div class="bg bg-orange">Some Text</div>
<div class="bg bg-black">Some Text</div>
<div class="bg bg-white">Some Text</div>

<script>
    'use strict';

    (() => {

        // Clean up the contrast of all ".bg" elements
        const light = '#EFEFEF',
              dark  = '#232323';

        textContrast.fix('.bg', light, dark);

        // If light/dark colors are omitted, 'white' and 'black' are used
        // textContrast.fix('.bg');

    })();
</script>

```

## textContrast.fix(el[, light[, dark]])

This method will check the background-color of each element found and set it's color to light or dark as appropriate. `el` parameter can be an element, array of elements, selector, or array of selectors. Does not look at background-color of parent elements.

## textContrast.isLight(color)

Returns `true` if `color` is considered light, `false` otherwise. Color format can be hex, rgb, or rgba (note that rgba alpha channels are not considered in determining lightness). Throws error if `color` cannot be parsed and converted to an RGB value.

#### Examples

```js
    'use strict';

    // Hex codes can be 3 or 6 characters
    // Hex should match pattern /^#?([0-9a-fA-F]{3}){1,2}$/
    textContrast.isLight('#fff');    // true
    textContrast.isLight('#efefef'); // true

    // Leading octothorpe not required
    textContrast.isLight('fafafa'); // true

    // Can also use rgb/rgba values
    textContrast.isLight('rgb(255,255,255)');      // true
    textContrast.isLight('rgba(255,255,255, .5)'); // true
    // Note that transparency is not considered

    textContrast.isLight('#000'); // false
```

## textContrast.isDark(color)

Returns `true` if `color` is considered dark, `false` otherwise. Color format can be hex, rgb, or rgba (note that rgba alpha channels are not considered in determining lightness). Throws error if supplied color cannot be parsed and converted to an RGB value.

#### Examples

```js
    'use strict';

    // Hex codes can be 3 or 6 characters
    textContrast.isDark('#000');    // true
    textContrast.isDark('#232323'); // true

    // Leading octothorpe not required
    textContrast.isDark('333333'); // true

    // Can also use rgb/rgba values
    textContrast.isDark('rgb(0,0,0)');      // true
    textContrast.isDark('rgba(0,0,0, .5)'); // true
    // Note that transparency is not considered

    textContrast.isDark('#000'); // true

```

## textContrast.isLightOrDark(color)

Returns `'light'` if color is considered light, `'dark'` if the color is dark, undefined otherwise.

#### Examples

```js
    'use strict';

    // Hex codes can be 3 or 6 characters
    textContrast.isLightOrDark('#000');    // 'dark'
    textContrast.isLightOrDark('#232323'); // 'dark'

    // Leading octothorpe not required
    textContrast.isLightOrDark('efefef'); // 'light'

    // Can also use rgb/rgba values
    textContrast.isLightOrDark('rgb(0,0,0)'); // 'dark'
    textContrast.isLightOrDark('rgba(255,255,255, .5)'); // 'light'
    // Note that transparency is not considered

    textContrast.isLightOrDark('#000'); // 'dark'
```
