const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, "/dist"),
    },
    
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(eot|ttf|woff|svg|webp)$/i,
                use: [ {
                    options: {
                        outputPath: "assets/"
                    },
                    loader: "file-loader"
                }]
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],

            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
              { from: "src/img", to: "assets" }
            ],
        }),
        new HtmlWebpackPlugin( {
            template: "./src/index.html"
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        })

    ]
};