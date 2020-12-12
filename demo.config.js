const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const MINIFY_NAME = "supreme.validation.min";
const FORM_MINIFY_NAME = "supreme.validation.theme.min";

module.exports = {
    entry: [
        "./src/script/script.js"
    ],
    output: {
        path: path.resolve(__dirname, "demo"),
        filename: `assets/js/${MINIFY_NAME}.js`
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/react", "@babel/env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/"
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
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new MinifyPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css"
        }),
        new CopyPlugin([
            { from: "./src/assets/fonts", to: "./assets/fonts" },
            { from: "./src/assets/img", to: "./assets/img" }
        ])
    ]
};