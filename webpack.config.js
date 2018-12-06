'use strict';

const path = require('path');

module.exports = {
    entry: './src/text-contrast.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'text-contrast.min.js'
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
