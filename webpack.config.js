'use strict';

const path = require('path');

module.exports = {
    entry: './src/text-contrast.js',
    output: {
        path:      path.resolve('./dist'),
        filename: 'text-contrast.min.js',
        // Will wrap in 'textContrast' namespace
        // Omit since we're returning a namespaced object already
        library:  'textContrast',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6784
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
		]
    },
    devtool: 'source-map'
}
