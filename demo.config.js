const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        "supreme.validation.min": "./src/script/script.js",
        "supreme.validation.min": "./src/style/style-demo.scss",
        "supreme.validation.theme.min": "./src/style/form.scss"
    },
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'assets/js/[name].js'
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
            filename: './assets/css/[name].css'
        }),
        new CopyPlugin([
            { from: './src/assets/fonts', to: './assets/fonts' },
            { from: './src/assets/img', to: './assets/img' }
        ])
    ]
}