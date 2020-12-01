const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "./src/script/script.js",
        './src/style/style-not-library.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'assets/js/supreme.validation.min.js'
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
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MinifyPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/css/supreme.validation.min.css'
        }),
        new CopyPlugin([
            { from: './src/assets/fonts', to: './assets/fonts' },
            { from: './src/assets/img', to: './assets/img' }
        ])
    ]
}