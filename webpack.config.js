
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './scripts/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        assetModuleFilename: '[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },

}