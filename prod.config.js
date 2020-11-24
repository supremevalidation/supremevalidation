const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: "./src/script/script.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/script.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react', '@babel/env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MinifyPlugin()
    ]
}