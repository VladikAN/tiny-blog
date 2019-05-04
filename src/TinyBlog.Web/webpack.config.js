const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', 'css', 'scss'],
        modules: [
            path.resolve(__dirname, 'Content'),
            path.resolve(__dirname, 'Scripts'),
            'node_modules'
        ]
    },
    entry: {
        index: './Scripts/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/js')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '../css/main.css' })
    ]
};